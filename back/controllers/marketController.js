const MandiPrice = require('../models/MandiPrice');
const Batch = require('../models/Batch');
const Transaction = require('../models/Transaction');

// GET /api/v1/mandi-prices?state=
exports.getMandiPrices = async (req, res, next) => {
  try {
    const { state, crop } = req.query;
    const filter = {};
    if (state && state !== 'All') {
      filter.state = new RegExp(state.trim(), 'i');
    }
    if (crop && crop !== 'All') {
      filter.crop = new RegExp(crop.trim(), 'i');
    }

    const prices = await MandiPrice.find(filter).sort('crop');
    res.json(prices);
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/weather?lat=&lng=
exports.getWeather = async (req, res) => {
  const { lat, lng } = req.query;
  const sampleWeather = {
    tempC: 31,
    condition: 'Partly Cloudy',
    humidity: 68,
    windSpeedKm: 14,
    location: lat && lng ? `Coords: ${Number(lat).toFixed(2)}, ${Number(lng).toFixed(2)}` : 'Guntur AP Mandi Hub',
    forecast: 'Mild evening showers expected in coastal belts; good drying weather till 4 PM.',
    advisory: 'Optimal window for sun drying Guntur Sannam chillies and grain bag stacking. Ensure moisture stays under 10%.'
  };
  res.json(sampleWeather);
};

// GET /api/v1/analytics/summary (Admin only)
exports.getAnalyticsSummary = async (req, res, next) => {
  try {
    // 1. Stage Funnel aggregation (batches per status)
    const funnelAgg = await Batch.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    const stageFunnel = funnelAgg.map((item) => ({
      stage: item._id,
      count: item.count
    }));

    // 2. Crop Volume / Category Share aggregation
    const cropAgg = await Batch.aggregate([
      { $group: { _id: '$crop.name', value: { $sum: '$quantity' } } },
      { $sort: { value: -1 } }
    ]);
    const cropDonut = cropAgg.map((item) => ({
      name: item._id,
      value: item.value
    }));

    // 3. Monthly Quantity Trend aggregation
    const trendAgg = await Batch.aggregate([
      {
        $group: {
          _id: { $substr: ['$harvestDate', 0, 7] }, // YYYY-MM
          volume: { $sum: '$quantity' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyTrend = trendAgg.map((item) => {
      const parts = (item._id || '').split('-');
      const monthIdx = parts[1] ? parseInt(parts[1], 10) - 1 : 0;
      return {
        month: monthNames[monthIdx] || item._id,
        volume: item.volume
      };
    });

    // 4. Price Breakdown (average or sample)
    const priceBreakdown = {
      farmerShare: 64,
      logisticsMargin: 16,
      retailerMargin: 20
    };

    // 5. Total counts & revenue aggregations (Real data: paid transactions & sold batches)
    const totalBatches = await Batch.countDocuments();
    const inTransitCount = await Batch.countDocuments({ status: 'In Transit' });

    const totalQuantityAgg = await Batch.aggregate([
      { $group: { _id: null, total: { $sum: '$quantity' } } }
    ]);
    const totalQuantity = totalQuantityAgg.length > 0 ? totalQuantityAgg[0].total : 0;

    // Revenue only from Paid transactions
    const paidRevenueAgg = await Transaction.aggregate([
      { $match: { status: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalPaidRevenue = paidRevenueAgg.length > 0 ? paidRevenueAgg[0].total : 0;

    // Realized revenue from Sold batches
    const soldBatchesRevenueAgg = await Batch.aggregate([
      { $match: { status: 'Sold' } },
      { $group: { _id: null, total: { $sum: { $multiply: ['$quantity', '$pricePerUnit'] } } } }
    ]);
    const soldBatchesRevenue = soldBatchesRevenueAgg.length > 0 ? soldBatchesRevenueAgg[0].total : 0;

    // Expected value from batches not yet sold
    const expectedValueAgg = await Batch.aggregate([
      { $match: { status: { $nin: ['Sold', 'Rejected', 'Expired'] } } },
      { $group: { _id: null, total: { $sum: { $multiply: ['$quantity', '$pricePerUnit'] } } } }
    ]);
    const expectedValue = expectedValueAgg.length > 0 ? expectedValueAgg[0].total : 0;

    res.json({
      totalBatches,
      totalQuantity,
      inTransitCount,
      totalPaidRevenue,
      soldBatchesRevenue,
      expectedValue,
      stageFunnel,
      cropDonut,
      monthlyTrend,
      priceBreakdown
    });
  } catch (error) {
    next(error);
  }
};
