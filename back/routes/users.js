const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');
const requireRole = require('../middleware/requireRole');

// Admin-only user management
router.use(requireAuth, requireRole('admin'));

router.get('/', userController.getUsers);
router.patch('/:userId/role', userController.updateUserRole);
router.patch('/:userId/active', userController.updateUserActive);
router.delete('/:userId', userController.deleteUser);

module.exports = router;
