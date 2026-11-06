const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Buyer name is required'],
      trim: true
    },
    type: {
      type: String,
      enum: ['Wholesaler', 'Supermarket', 'Food Processor', 'Export Business', 'Local Market'],
      required: [true, 'Buyer type is required']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true
    },
    totalPurchases: {
      type: Number,
      default: 0
    },
    totalAmountSpent: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 5.0
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

buyerSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Buyer', buyerSchema);
