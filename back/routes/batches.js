const express = require('express');
const router = express.Router();
const batchController = require('../controllers/batchController');
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');

// Public endpoints
router.get('/:batchId', batchController.getBatchById);
router.post('/:batchId/ratings', batchController.addRating);
router.post('/:batchId/complaints', batchController.addComplaint);

// Protected endpoints
router.get('/', requireAuth, batchController.getBatches);
router.post('/', requireAuth, requireRole('farmer'), batchController.createBatch);
router.put('/:batchId/status', requireAuth, requireRole('collectionCenter', 'distributor', 'retailer', 'admin'), batchController.updateBatchStatus);
router.delete('/:batchId', requireAuth, batchController.deleteBatch);

module.exports = router;
