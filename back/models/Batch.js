const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 }
  },
  { _id: false }
);

const stageHistorySchema = new mongoose.Schema(
  {
    stage: {
      type: String,
      enum: ['farmer', 'harvest', 'collectionCenter', 'distributor', 'retailer', 'consumer'],
      required: true
    },
    handlerName: { type: String, required: true },
    handlerRole: {
      type: String,
      enum: ['farmer', 'collectionCenter', 'distributor', 'retailer', 'consumer', 'admin'],
      required: true
    },
    location: { type: locationSchema, required: true },
    timestamp: { type: String, default: () => new Date().toISOString() },
    notes: { type: String, default: '' },
    temperature: { type: Number },
    humidity: { type: Number },
    status: { type: String, required: true }
  },
  { _id: false }
);

const ratingSchema = new mongoose.Schema(
  {
    id: { type: String, default: () => `r-${Date.now()}` },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: '' },
    userLocation: { type: String, default: '' },
    date: { type: String, default: () => new Date().toISOString().split('T')[0] }
  },
  { _id: false }
);

const complaintSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    issueType: { type: String, default: 'Quality Issue' },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: true }
);

const batchSchema = new mongoose.Schema(
  {
    batchId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    crop: {
      name: { type: String, required: true, trim: true },
      variety: { type: String, required: true, trim: true },
      category: {
        type: String,
        enum: ['grain', 'vegetable', 'fruit', 'pulse', 'spice', 'oilseed', 'cash crop'],
        default: 'grain'
      },
      emoji: { type: String, default: '🌱' }
    },
    farmer: {
      id: { type: String },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String, required: true },
      village: { type: String, default: '' },
      district: { type: String, default: '' },
      state: { type: String, default: '' },
      phone: { type: String, default: '' },
      avatarUrl: { type: String, default: '' },
      farmSizeAcres: { type: Number },
      experienceYears: { type: Number },
      bio: { type: String }
    },
    harvestDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
    quantity: { type: Number, required: true },
    unit: {
      type: String,
      enum: ['kg', 'quintal', 'tonne'],
      default: 'kg'
    },
    qualityGrade: {
      type: String,
      enum: ['A', 'B', 'C'],
      default: 'A'
    },
    qualityNotes: { type: String, default: '' },
    photoUrl: { type: String, default: '' },
    currentLocation: { type: locationSchema, required: true },
    status: {
      type: String,
      enum: [
        'Created',
        'Harvested',
        'Quality Checked',
        'At Collection Center',
        'In Transit',
        'At Distributor',
        'At Retailer',
        'Sold',
        'Rejected',
        'Expired'
      ],
      default: 'Harvested'
    },
    pricePerUnit: { type: Number, default: 0 },
    organic: { type: Boolean, default: false },
    moisture: { type: Number, default: 0 },
    expiryDate: { type: String },
    stageHistory: [stageHistorySchema],
    qrCode: { type: String },
    carbonFootprint: {
      distanceKm: { type: Number, default: 25 },
      co2SavedKg: { type: Number, default: 12 }
    },
    ratings: [ratingSchema],
    complaints: [complaintSchema],
    costBreakdown: {
      farmerSharePercent: { type: Number, default: 62 },
      logisticsPercent: { type: Number, default: 18 },
      retailerMarginPercent: { type: Number, default: 20 }
    },
    storageCondition: { type: String, default: 'Ambient' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
);

// Indexes
batchSchema.index({ status: 1 });
batchSchema.index({ 'crop.name': 1, status: 1 });
batchSchema.index({ 'crop.name': 'text', 'farmer.name': 'text' });

batchSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Batch', batchSchema);
