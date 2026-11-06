/**
 * LAB 2B: HTML Form Processing with express.urlencoded Middleware
 * Syllabus Demo - Runnable standalone with: node syllabus-demo/lab2b-form-data.js
 */

const express = require('express');
const app = express();
const PORT = 3005;

// URL-encoded middleware to parse application/x-www-form-urlencoded form submissions
app.use(express.urlencoded({ extended: true }));

// In-memory feedback collection
const submissions = [];

// GET: Render an HTML form
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Lab 2B: Form Data</title>
      <style>
        body { font-family: sans-serif; background: #FAF9F5; padding: 2rem; }
        .box { background: white; max-width: 500px; margin: 0 auto; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        input, select, textarea, button { width: 100%; margin-top: 0.5rem; margin-bottom: 1rem; padding: 0.6rem; border-radius: 6px; border: 1px solid #CCC; box-sizing: border-box; }
        button { background: #2E7D32; color: white; border: none; font-weight: bold; cursor: pointer; }
      </style>
    </head>
    <body>
      <div class="box">
        <h2 style="color:#2E7D32;">Harvest Registration Form</h2>
        <form method="POST" action="/submit-harvest">
          <label>Farmer Name:</label>
          <input type="text" name="farmerName" required placeholder="e.g. Swathi" />

          <label>Crop Name:</label>
          <input type="text" name="cropName" required placeholder="e.g. Chilli" />

          <label>Quantity (kg):</label>
          <input type="number" name="quantity" required placeholder="1500" />

          <button type="submit">Submit Harvest Record</button>
        </form>
        <p><a href="/submissions">View Submitted Records (${submissions.length})</a></p>
      </div>
    </body>
    </html>
  `);
});

// POST: Read data from req.body and process
app.post('/submit-harvest', (req, res) => {
  const { farmerName, cropName, quantity } = req.body;

  const record = {
    id: submissions.length + 1,
    farmerName,
    cropName,
    quantity: Number(quantity),
    submittedAt: new Date().toLocaleTimeString()
  };

  submissions.push(record);

  res.send(`
    <!DOCTYPE html>
    <html>
    <head><title>Submitted</title><style>body{font-family:sans-serif;text-align:center;padding:3rem;background:#E8F5E9;}</style></head>
    <body>
      <h2>✅ Harvest Successfully Registered!</h2>
      <p>Thank you <strong>${farmerName}</strong>. Logged <strong>${quantity} kg</strong> of <strong>${cropName}</strong>.</p>
      <p><a href="/">Submit Another</a> | <a href="/submissions">View All Records</a></p>
    </body>
    </html>
  `);
});

app.get('/submissions', (req, res) => {
  res.json({ count: submissions.length, records: submissions });
});

app.listen(PORT, () => {
  console.log(`[Lab 2B] Server running at http://localhost:${PORT}`);
  console.log('Open browser at:');
  console.log(`  http://localhost:${PORT}`);
});
