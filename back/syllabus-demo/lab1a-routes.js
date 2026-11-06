/**
 * LAB 1A: Express Routing, Route Parameters, Query Parameters, and URL Building
 * Syllabus Demo - Runnable standalone with: node syllabus-demo/lab1a-routes.js
 */

const express = require('express');
const app = express();
const PORT = 3001;

// 1. Basic Route definition
app.get('/', (req, res) => {
  res.send('Welcome to Lab 1A: Basic Express Routing Demonstration');
});

// 2. Route Parameters (req.params)
// Example URL: http://localhost:3001/batches/FF-2026-000101
app.get('/batches/:batchId', (req, res) => {
  const { batchId } = req.params;
  res.json({
    message: 'Route parameter captured successfully',
    capturedParam: batchId,
    resource: `Batch details for ${batchId}`
  });
});

// 3. Query Parameters (req.query)
// Example URL: http://localhost:3001/search?crop=Chilli&state=AndhraPradesh&limit=10
app.get('/search', (req, res) => {
  const { crop, state, limit } = req.query;
  res.json({
    message: 'Query parameters parsed successfully',
    queryParams: {
      crop: crop || 'All Crops',
      state: state || 'All States',
      limit: parseInt(limit, 10) || 20
    }
  });
});

// 4. Dynamic URL Building using req.protocol and req.get('host')
// Example URL: http://localhost:3001/share/FF-2026-000555
app.get('/share/:batchId', (req, res) => {
  const { batchId } = req.params;
  const protocol = req.protocol; // http or https
  const host = req.get('host');  // localhost:3001
  const fullShareUrl = `${protocol}://${host}/batches/${batchId}`;
  const qrDirectLink = `${protocol}://${host}/qr?data=${encodeURIComponent(fullShareUrl)}`;

  res.json({
    batchId,
    constructedBaseUrl: `${protocol}://${host}`,
    shareableUrl: fullShareUrl,
    qrDirectLink
  });
});

app.listen(PORT, () => {
  console.log(`[Lab 1A] Server running at http://localhost:${PORT}`);
  console.log('Try visiting:');
  console.log(`  http://localhost:${PORT}/batches/FF-2026-000101`);
  console.log(`  http://localhost:${PORT}/search?crop=Chilli&state=AP&limit=5`);
  console.log(`  http://localhost:${PORT}/share/FF-2026-000101`);
});
