const Batch = require('../models/Batch');
const Counter = require('../models/Counter');
const User = require('../models/User');

// GET /api/v1/batches
exports.getBatches = async (req, res, next) => {
  try {
    const { status, crop, search, page = 1, limit = 50, sort = '-createdAt', farmerId } = req.query;

    const query = {};

    // Role-based visibility
    if (req.session && req.session.userId) {
      const userRole = req.session.role;
      if (userRole === 'farmer') {
        query.$or = [
          { 'farmer.user': req.session.userId },
          { createdBy: req.session.userId }
        ];
      }
    }

    if (farmerId) {
      query['farmer.id'] = farmerId;
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    if (crop && crop !== 'All') {
      query['crop.name'] = new RegExp(`^${crop}$`, 'i');
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [
        { batchId: regex },
        { 'crop.name': regex },
        { 'crop.variety': regex },
        { 'farmer.name': regex },
        { 'farmer.district': regex },
        { status: regex }
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 50;
    const skip = (pageNum - 1) * limitNum;

    const batches = await Batch.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    res.json(batches);
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/batches/:batchId (PUBLIC)
exports.getBatchById = async (req, res, next) => {
  try {
    const { batchId } = req.params;
    const batch = await Batch.findOne({
      batchId: new RegExp(`^${batchId}$`, 'i')
    });

    if (!batch) {
      return res.status(404).json({ message: `Batch '${batchId}' not found` });
    }

    res.json(batch);
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/batches (Farmer only)
exports.createBatch = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const year = new Date().getFullYear();
    const counter = await Counter.findByIdAndUpdate(
      'batchId',
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    const batchId = `FF-${year}-${String(counter.seq).padStart(6, '0')}`;

    const host = req.get('host');
    const protocol = req.protocol;
    const clientOrigin = process.env.CLIENT_ORIGIN || `${protocol}://${host}`;
    const qrUrl = `${clientOrigin}/trace/${batchId}`;

    const initialLocation = req.body.currentLocation || {
      name: `${user.village || user.city || 'Farm'}, ${user.district || user.state || ''}`,
      lat: 16.3067,
      lng: 80.4365
    };

    const initialStatus = req.body.status || 'Harvested';

    const stageHistory = [
      {
        stage: 'farmer',
        handlerName: user.name,
        handlerRole: 'farmer',
        location: initialLocation,
        timestamp: new Date().toISOString(),
        notes: req.body.qualityNotes || 'Batch created & initial harvest entry logged.',
        status: initialStatus
      }
    ];

    const farmerProfile = {
      id: user._id.toString(),
      user: user._id,
      name: user.name,
      village: user.village || user.city || '',
      district: user.district || '',
      state: user.state || 'Andhra Pradesh',
      phone: user.phone || '',
      avatarUrl: user.avatarUrl || ''
    };

    const newBatch = await Batch.create({
      batchId,
      crop: req.body.crop,
      farmer: req.body.farmer ? { ...farmerProfile, ...req.body.farmer, user: user._id } : farmerProfile,
      harvestDate: req.body.harvestDate || new Date().toISOString().split('T')[0],
      quantity: req.body.quantity,
      unit: req.body.unit || 'kg',
      qualityGrade: req.body.qualityGrade || 'A',
      qualityNotes: req.body.qualityNotes || '',
      photoUrl: req.body.photoUrl || '',
      currentLocation: initialLocation,
      status: initialStatus,
      pricePerUnit: req.body.pricePerUnit || 0,
      organic: req.body.organic !== undefined ? req.body.organic : true,
      moisture: req.body.moisture || 0,
      expiryDate: req.body.expiryDate,
      stageHistory,
      qrCode: batchId,
      carbonFootprint: {
        distanceKm: Math.floor(Math.random() * 40) + 10,
        co2SavedKg: Math.floor(Math.random() * 15) + 5
      },
      createdBy: user._id
    });

    res.status(201).json(newBatch);
  } catch (error) {
    next(error);
  }
};

// PUT /api/v1/batches/:batchId/status (collectionCenter, distributor, retailer, admin)
exports.updateBatchStatus = async (req, res, next) => {
  try {
    const { batchId } = req.params;
    const { newStatus, stageData, status } = req.body;
    const nextStatus = newStatus || status;

    if (!nextStatus) {
      return res.status(400).json({ message: 'Target status is required' });
    }

    const batch = await Batch.findOne({
      batchId: new RegExp(`^${batchId}$`, 'i')
    });

    if (!batch) {
      return res.status(404).json({ message: `Batch '${batchId}' not found` });
    }

    const user = await User.findById(req.session.userId);

    const historyItem = {
      stage: (stageData && stageData.stage) || 'collectionCenter',
      handlerName: (stageData && stageData.handlerName) || (user ? user.name : 'Authorized Handler'),
      handlerRole: (stageData && stageData.handlerRole) || req.session.role,
      location: (stageData && stageData.location) || batch.currentLocation,
      timestamp: new Date().toISOString(),
      notes: (stageData && stageData.notes) || `Status advanced to ${nextStatus}`,
      temperature: stageData ? stageData.temperature : undefined,
      humidity: stageData ? stageData.humidity : undefined,
      status: nextStatus
    };

    batch.status = nextStatus;
    if (stageData && stageData.location) {
      batch.currentLocation = stageData.location;
    }
    batch.stageHistory.push(historyItem);

    await batch.save();
    res.json(batch);
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/batches/:batchId/ratings (PUBLIC)
exports.addRating = async (req, res, next) => {
  try {
    const { batchId } = req.params;
    const { rating, comment, userLocation } = req.body;

    if (!rating) {
      return res.status(400).json({ message: 'Rating is required (1-5)' });
    }

    const batch = await Batch.findOne({
      batchId: new RegExp(`^${batchId}$`, 'i')
    });

    if (!batch) {
      return res.status(404).json({ message: `Batch '${batchId}' not found` });
    }

    const newRating = {
      id: `r-${Date.now()}`,
      rating: Number(rating),
      comment: comment || '',
      userLocation: userLocation || 'India',
      date: new Date().toISOString().split('T')[0]
    };

    batch.ratings.push(newRating);
    await batch.save();

    res.status(201).json(batch);
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/batches/:batchId/complaints (PUBLIC)
exports.addComplaint = async (req, res, next) => {
  try {
    const { batchId } = req.params;
    const { name, email, phone, issueType, description } = req.body;

    if (!description) {
      return res.status(400).json({ message: 'Complaint description is required' });
    }

    const batch = await Batch.findOne({
      batchId: new RegExp(`^${batchId}$`, 'i')
    });

    if (!batch) {
      return res.status(404).json({ message: `Batch '${batchId}' not found` });
    }

    batch.complaints.push({
      name: name || 'Anonymous Consumer',
      email: email || '',
      phone: phone || '',
      issueType: issueType || 'Quality Issue',
      description
    });

    await batch.save();
    res.status(201).json({ message: 'Complaint recorded successfully', batchId });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/batches/:batchId (Owner farmer or admin only)
exports.deleteBatch = async (req, res, next) => {
  try {
    const { batchId } = req.params;
    const batch = await Batch.findOne({
      batchId: new RegExp(`^${batchId}$`, 'i')
    });

    if (!batch) {
      return res.status(404).json({ message: `Batch '${batchId}' not found` });
    }

    const isAdmin = req.session.role === 'admin';
    const isOwner = batch.createdBy && batch.createdBy.toString() === req.session.userId;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: 'You are not authorized to delete this batch' });
    }

    await Batch.deleteOne({ _id: batch._id });
    res.status(200).json({ message: `Batch ${batchId} deleted successfully` });
  } catch (error) {
    next(error);
  }
};
