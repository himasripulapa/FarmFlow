/**
 * LAB 11A: Mongoose Object-Data Modeling (ODM) & CRUD Operations
 * Syllabus Demo - Runnable standalone with: node syllabus-demo/lab11a-mongoose-crud.js
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');

// 1. Define Schema
const demoBatchSchema = new mongoose.Schema({
  batchCode: { type: String, required: true, unique: true },
  cropName: { type: String, required: true },
  farmerName: { type: String, required: true },
  quantity: { type: Number, required: true },
  qualityGrade: { type: String, enum: ['A', 'B', 'C'], default: 'A' },
  isOrganic: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const DemoBatch = mongoose.model('DemoBatch', demoBatchSchema);

async function runMongooseCrudDemo() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Error: Please provide MONGODB_URI in back/.env');
    process.exit(1);
  }

  try {
    console.log('--- Step 1: Connecting to MongoDB Atlas ---');
    await mongoose.connect(uri);
    console.log(`Connected to host: ${mongoose.connection.host}`);

    console.log('\n--- Step 2: CREATE Operation ---');
    const newBatch = await DemoBatch.create({
      batchCode: `DEMO-${Date.now()}`,
      cropName: 'Guntur Sannam Chilli',
      farmerName: 'Swathi',
      quantity: 1200,
      qualityGrade: 'A',
      isOrganic: true
    });
    console.log('Document inserted:', newBatch._id.toString(), newBatch.batchCode);

    console.log('\n--- Step 3: READ Operation (find & findOne) ---');
    const found = await DemoBatch.findOne({ _id: newBatch._id });
    console.log(`Retrieved: ${found.cropName} by ${found.farmerName}, Quantity: ${found.quantity} kg`);

    console.log('\n--- Step 4: UPDATE Operation ---');
    const updated = await DemoBatch.findByIdAndUpdate(
      newBatch._id,
      { quantity: 1500, qualityGrade: 'A' },
      { new: true }
    );
    console.log(`Updated quantity to: ${updated.quantity} kg`);

    console.log('\n--- Step 5: DELETE Operation ---');
    await DemoBatch.findByIdAndDelete(newBatch._id);
    console.log(`Deleted document ${newBatch._id} successfully`);

    const countAfter = await DemoBatch.countDocuments({ _id: newBatch._id });
    console.log(`Confirmation check (count): ${countAfter}`);

    await mongoose.disconnect();
    console.log('\n--- Mongoose Disconnected Cleanly ---');
  } catch (error) {
    console.error('Mongoose CRUD error:', error.message);
  }
}

runMongooseCrudDemo();
