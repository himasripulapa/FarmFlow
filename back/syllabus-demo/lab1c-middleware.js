/**
 * LAB 1C: Express Middleware Pipeline (Application-level, Route-level, Error-handling)
 * Syllabus Demo - Runnable standalone with: node syllabus-demo/lab1c-middleware.js
 */

const express = require('express');
const app = express();
const PORT = 3003;

app.use(express.json());

// 1. APPLICATION-LEVEL MIDDLEWARE (Executes on every incoming request)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[APP-LOGGER] ${timestamp} | ${req.method} ${req.url}`);
  req.requestReceivedAt = Date.now();
  next(); // Pass control to the next handler
});

// 2. ROUTE-LEVEL MIDDLEWARE (Executes only on targeted routes)
const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  if (apiKey !== 'FARM2026') {
    return res.status(403).json({
      error: 'Forbidden: Valid x-api-key header or ?apiKey=FARM2026 is required'
    });
  }
  next();
};

// Public Route (No route-level guard)
app.get('/public', (req, res) => {
  res.json({
    message: 'This is a public endpoint accessible without credentials',
    processedInMs: Date.now() - req.requestReceivedAt
  });
});

// Protected Route (Protected by route-level middleware checkApiKey)
app.get('/protected-vault', checkApiKey, (req, res) => {
  res.json({
    message: 'Access granted to secure vault!',
    secretData: 'Confidential crop subsidy allocation records',
    processedInMs: Date.now() - req.requestReceivedAt
  });
});

// Trigger route for testing error-handling middleware
app.get('/simulate-error', (req, res, next) => {
  const err = new Error('Database connection failed unexpectedly during sync!');
  err.statusCode = 503;
  next(err); // Passing an argument to next() triggers error middleware
});

// 3. ERROR-HANDLING MIDDLEWARE (Always has 4 parameters: err, req, res, next)
app.use((err, req, res, next) => {
  console.error('[ERROR-HANDLER] Caught error in pipeline:', err.message);
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    error: {
      status,
      message: err.message,
      occurredAt: new Date().toISOString()
    }
  });
});

app.listen(PORT, () => {
  console.log(`[Lab 1C] Server running at http://localhost:${PORT}`);
  console.log('Endpoints:');
  console.log(`  http://localhost:${PORT}/public`);
  console.log(`  http://localhost:${PORT}/protected-vault (Blocked)`);
  console.log(`  http://localhost:${PORT}/protected-vault?apiKey=FARM2026 (Allowed)`);
  console.log(`  http://localhost:${PORT}/simulate-error`);
});
