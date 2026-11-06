/**
 * LAB 2A: Server-Side Templating with EJS
 * Syllabus Demo - Runnable standalone with: node syllabus-demo/lab2a-templating.js
 */

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3004;

// Configure EJS view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  const sampleCrops = [
    { name: 'Guntur Sannam Chilli', price: 185, quality: 'Grade A' },
    { name: 'Banganapalli Mango', price: 65, quality: 'Export Quality' },
    { name: 'Nizamabad Turmeric', price: 142, quality: 'Grade A+' }
  ];

  // Render index.ejs passing dynamic variables
  res.render('index', {
    title: 'Lab 2A: EJS Templating Engine',
    heading: 'FarmFlow Agricultural Dashboard',
    description: 'This page is dynamically server-rendered with EJS templates using data objects.',
    crops: sampleCrops
  });
});

app.listen(PORT, () => {
  console.log(`[Lab 2A] Server running at http://localhost:${PORT}`);
  console.log('Open browser at:');
  console.log(`  http://localhost:${PORT}`);
});
