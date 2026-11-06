const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    batchId: {
      type: String,
      required: true
    },
    cropName: {
      type: String,
      default: ''
    },
    fromUser: {
      type: String,
      required: true
    },
    toUser: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      default: 'kg'
    },
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['Paid', 'Pending', 'Failed'],
      default: 'Paid'
    },
    paymentMethod: {
      type: String,
      enum: ['UPI', 'Direct Transfer', 'Bank Guarantee', 'Cash'],
      default: 'UPI'
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

transactionSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
