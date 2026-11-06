const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');

router.get('/', requireAuth, transactionController.getTransactions);
router.post('/', requireAuth, transactionController.createTransaction);
router.delete('/:id', requireAuth, requireRole('admin'), transactionController.deleteTransaction);

module.exports = router;
