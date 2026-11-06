const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required']
    },
    role: {
      type: String,
      enum: ['farmer', 'collectionCenter', 'distributor', 'retailer', 'consumer', 'admin'],
      default: 'farmer'
    },
    village: {
      type: String,
      trim: true
    },
    district: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      default: 'Andhra Pradesh',
      trim: true
    },
    language: {
      type: String,
      default: 'en'
    },
    active: {
      type: Boolean,
      default: true
    },
    avatarUrl: {
      type: String,
      default: ''
    },
    businessName: {
      type: String,
      trim: true
    },
    centerName: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Transform for JSON serialization (never expose passwordHash, provide id instead of _id)
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
    return ret;
  }
});

userSchema.set('toObject', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);
