const express = require('express');
const router = express.Router();
const buyerController = require('../controllers/buyerController');
const requireAuth = require('../middleware/requireAuth');

router.get('/', requireAuth, buyerController.getBuyers);
router.post('/', requireAuth, buyerController.createBuyer);
router.put('/:id', requireAuth, buyerController.updateBuyer);
router.delete('/:id', requireAuth, buyerController.deleteBuyer);

module.exports = router;
