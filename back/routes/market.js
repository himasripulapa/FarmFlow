const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketController');
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');

router.get('/mandi-prices', marketController.getMandiPrices);
router.get('/weather', marketController.getWeather);
router.get('/analytics/summary', requireAuth, requireRole('admin'), marketController.getAnalyticsSummary);

module.exports = router;
