const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error('MongoDB connection error: MONGODB_URI is not defined in .env');
      process.exit(1);
    }
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    console.error('Please verify your MONGODB_URI in back/.env and ensure Network Access in Atlas includes 0.0.0.0/0');
    process.exit(1);
  }
};

module.exports = connectDB;
