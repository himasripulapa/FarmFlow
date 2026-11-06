const Batch = require('../models/Batch');
const Transaction = require('../models/Transaction');

// GET /views/admin-report (Admin only)
exports.getAdminReport = async (req, res, next) => {
  try {
    const funnelAgg = await Batch.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    const stageFunnel = funnelAgg.map((item) => ({
      stage: item._id,
      count: item.count
    }));

    const cropAgg = await Batch.aggregate([
      { $group: { _id: '$crop.name', value: { $sum: '$quantity' } } },
      { $sort: { value: -1 } }
    ]);
    const cropDonut = cropAgg.map((item) => ({
      name: item._id,
      value: item.value
    }));

    const trendAgg = await Batch.aggregate([
      {
        $group: {
          _id: { $substr: ['$harvestDate', 0, 7] },
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

    const totalBatches = await Batch.countDocuments();
    const inTransitCount = await Batch.countDocuments({ status: 'In Transit' });

    const totalQuantityAgg = await Batch.aggregate([
      { $group: { _id: null, total: { $sum: '$quantity' } } }
    ]);
    const totalQuantity = totalQuantityAgg.length > 0 ? totalQuantityAgg[0].total : 0;

    // Realized Revenue from Paid Transactions
    const paidRevenueAgg = await Transaction.aggregate([
      { $match: { status: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalPaidRevenue = paidRevenueAgg.length > 0 ? paidRevenueAgg[0].total : 0;

    // Expected value from batches not yet sold
    const expectedValueAgg = await Batch.aggregate([
      { $match: { status: { $nin: ['Sold', 'Rejected', 'Expired'] } } },
      { $group: { _id: null, total: { $sum: { $multiply: ['$quantity', '$pricePerUnit'] } } } }
    ]);
    const expectedValue = expectedValueAgg.length > 0 ? expectedValueAgg[0].total : 0;

    res.render('admin-report', {
      title: 'Admin Supply Chain Report',
      summary: {
        totalBatches,
        totalQuantity,
        inTransitCount,
        totalPaidRevenue,
        expectedValue,
        stageFunnel,
        cropDonut,
        monthlyTrend
      }
    });
  } catch (error) {
    next(error);
  }
};

// GET /views/certificate/:batchId (Public)
exports.getCertificate = async (req, res, next) => {
  try {
    const { batchId } = req.params;
    const batch = await Batch.findOne({
      batchId: new RegExp(`^${batchId}$`, 'i')
    });

    if (!batch) {
      return res.status(404).render('404', {
        title: 'Certificate Not Found',
        message: `No batch found with ID '${batchId}'`
      });
    }

    res.render('batch-certificate', {
      title: `Certificate - ${batch.batchId}`,
      batch
    });
  } catch (error) {
    next(error);
  }
};

// GET /views/complaint/:batchId (Public)
exports.getComplaintForm = async (req, res, next) => {
  try {
    const { batchId } = req.params;
    const batch = await Batch.findOne({
      batchId: new RegExp(`^${batchId}$`, 'i')
    });

    if (!batch) {
      return res.status(404).render('404', {
        title: 'Batch Not Found',
        message: `No batch found with ID '${batchId}'`
      });
    }

    res.render('complaint-form', {
      title: `Lodge Complaint - ${batch.batchId}`,
      batch,
      submitted: false
    });
  } catch (error) {
    next(error);
  }
};

// POST /views/complaint/:batchId (Form data urlencoded)
exports.postComplaint = async (req, res, next) => {
  try {
    const { batchId } = req.params;
    const { name, email, phone, issueType, description } = req.body;

    const batch = await Batch.findOne({
      batchId: new RegExp(`^${batchId}$`, 'i')
    });

    if (!batch) {
      return res.status(404).render('404', {
        title: 'Batch Not Found',
        message: `No batch found with ID '${batchId}'`
      });
    }

    const complaintData = {
      name: name || 'Anonymous Consumer',
      email: email || '',
      phone: phone || '',
      issueType: issueType || 'General Quality',
      description: description || 'No details provided'
    };

    batch.complaints.push(complaintData);
    await batch.save();

    res.render('complaint-form', {
      title: `Complaint Submitted - ${batch.batchId}`,
      batch,
      complaint: complaintData,
      submitted: true
    });
  } catch (error) {
    next(error);
  }
};
