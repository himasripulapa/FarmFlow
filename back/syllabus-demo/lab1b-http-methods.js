/**
 * LAB 1B: HTTP Methods (GET, POST, DELETE) with in-memory resource collection
 * Syllabus Demo - Runnable standalone with: node syllabus-demo/lab1b-http-methods.js
 */

const express = require('express');
const app = express();
const PORT = 3002;

// Middleware to parse incoming JSON payloads
app.use(express.json());

// In-memory data store for crops
let crops = [
  { id: 1, name: 'Guntur Sannam Chilli', category: 'Spice', price: 185 },
  { id: 2, name: 'Sona Masoori Rice', category: 'Grain', price: 55 },
  { id: 3, name: 'Salem Turmeric Finger', category: 'Spice', price: 140 }
];

// 1. GET: Retrieve all crops or a specific crop
app.get('/api/crops', (req, res) => {
  res.status(200).json({
    success: true,
    count: crops.length,
    data: crops
  });
});

app.get('/api/crops/:id', (req, res) => {
  const cropId = parseInt(req.params.id, 10);
  const foundCrop = crops.find(c => c.id === cropId);

  if (!foundCrop) {
    return res.status(404).json({
      success: false,
      message: `Crop with ID ${cropId} not found`
    });
  }

  res.status(200).json({ success: true, data: foundCrop });
});

// 2. POST: Accept new data and append to collection
app.post('/api/crops', (req, res) => {
  const { name, category, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      success: false,
      message: 'Name and price are required fields'
    });
  }

  const nextId = crops.length > 0 ? Math.max(...crops.map(c => c.id)) + 1 : 1;
  const newCrop = {
    id: nextId,
    name,
    category: category || 'General',
    price: Number(price)
  };

  crops.push(newCrop);

  res.status(201).json({
    success: true,
    message: 'New crop resource added successfully',
    data: newCrop
  });
});

// 3. DELETE: Remove a resource by ID
app.delete('/api/crops/:id', (req, res) => {
  const cropId = parseInt(req.params.id, 10);
  const initialLength = crops.length;

  crops = crops.filter(c => c.id !== cropId);

  if (crops.length === initialLength) {
    return res.status(404).json({
      success: false,
      message: `Cannot delete: crop with ID ${cropId} does not exist`
    });
  }

  res.status(200).json({
    success: true,
    message: `Crop ${cropId} removed successfully`,
    remainingCount: crops.length
  });
});

app.listen(PORT, () => {
  console.log(`[Lab 1B] Server running at http://localhost:${PORT}`);
  console.log('Endpoints:');
  console.log(`  GET    http://localhost:${PORT}/api/crops`);
  console.log(`  POST   http://localhost:${PORT}/api/crops (body: {"name":"Tomato","price":40})`);
  console.log(`  DELETE http://localhost:${PORT}/api/crops/1`);
});
