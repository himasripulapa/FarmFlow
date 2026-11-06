require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const MandiPrice = require('../models/MandiPrice');

const mandiData = [
  { crop: 'Chilli', market: 'Guntur Mandi', state: 'Andhra Pradesh', minPrice: 17200, maxPrice: 19400, modalPrice: 18500, changePercent: 3.4, trend: 'up' },
  { crop: 'Turmeric', market: 'Nizamabad Mandi', state: 'Telangana', minPrice: 13500, maxPrice: 14800, modalPrice: 14200, changePercent: 1.8, trend: 'up' },
  { crop: 'Paddy', market: 'Miryalaguda Mandi', state: 'Telangana', minPrice: 2280, maxPrice: 2360, modalPrice: 2320, changePercent: 0.5, trend: 'stable' },
  { crop: 'Cotton', market: 'Warangal Mandi', state: 'Telangana', minPrice: 7100, maxPrice: 7650, modalPrice: 7400, changePercent: -1.2, trend: 'down' },
  { crop: 'Mango', market: 'Chittoor Mandi', state: 'Andhra Pradesh', minPrice: 4200, maxPrice: 5300, modalPrice: 4800, changePercent: 5.1, trend: 'up' },
  { crop: 'Groundnut', market: 'Anantapur Mandi', state: 'Andhra Pradesh', minPrice: 6500, maxPrice: 7100, modalPrice: 6850, changePercent: 2.0, trend: 'up' },
  { crop: 'Banana', market: 'Pollachi Mandi', state: 'Tamil Nadu', minPrice: 2700, maxPrice: 3100, modalPrice: 2900, changePercent: -0.8, trend: 'down' },
  { crop: 'Tomato', market: 'Madanapalle Mandi', state: 'Andhra Pradesh', minPrice: 1400, maxPrice: 1950, modalPrice: 1650, changePercent: 8.5, trend: 'up' },
  { crop: 'Onion', market: 'Bengaluru APMC', state: 'Karnataka', minPrice: 2200, maxPrice: 2600, modalPrice: 2450, changePercent: -2.5, trend: 'down' },
  { crop: 'Maize', market: 'Davanagere Mandi', state: 'Karnataka', minPrice: 2050, maxPrice: 2220, modalPrice: 2150, changePercent: 0.2, trend: 'stable' },
  { crop: 'Coconut', market: 'Kochi APMC', state: 'Kerala', minPrice: 3400, maxPrice: 3800, modalPrice: 3600, changePercent: 1.5, trend: 'up' },
  { crop: 'Black Gram', market: 'Tirunelveli Mandi', state: 'Tamil Nadu', minPrice: 7700, maxPrice: 8400, modalPrice: 8100, changePercent: 4.2, trend: 'up' },
  { crop: 'Wheat', market: 'Khanna Mandi', state: 'Punjab', minPrice: 2275, maxPrice: 2450, modalPrice: 2350, changePercent: 1.1, trend: 'up' },
  { crop: 'Soybean', market: 'Indore Mandi', state: 'Madhya Pradesh', minPrice: 4300, maxPrice: 4800, modalPrice: 4600, changePercent: -0.5, trend: 'stable' }
];

async function seedMandi() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error('Error: MONGODB_URI is not set in back/.env');
      process.exit(1);
    }

    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(uri);
    console.log('Connected to database.');

    console.log('Seeding MandiPrice reference data...');
    await MandiPrice.deleteMany({});
    const inserted = await MandiPrice.insertMany(mandiData);

    console.log(`Successfully seeded ${inserted.length} Mandi crop prices.`);
    await mongoose.disconnect();
    console.log('Database disconnected.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
}

seedMandi();
