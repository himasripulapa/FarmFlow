const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middleware/validate');

router.post('/register', validate('name', 'phone', 'email', 'password'), authController.register);
router.post('/login', validate('email', 'password'), authController.login);
router.post('/logout', authController.logout);
router.get('/me', authController.getMe);

module.exports = router;
