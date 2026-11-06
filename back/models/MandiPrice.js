const mongoose = require('mongoose');

const mandiPriceSchema = new mongoose.Schema(
  {
    crop: {
      type: String,
      required: true,
      trim: true
    },
    market: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    minPrice: {
      type: Number,
      required: true
    },
    maxPrice: {
      type: Number,
      required: true
    },
    modalPrice: {
      type: Number,
      required: true
    },
    changePercent: {
      type: Number,
      default: 0
    },
    trend: {
      type: String,
      enum: ['up', 'down', 'stable'],
      default: 'stable'
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split('T')[0]
    }
  },
  {
    timestamps: true
  }
);

mandiPriceSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    ret.mandi = ret.market;
    ret.pricePerQuintal = ret.modalPrice;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('MandiPrice', mandiPriceSchema);
