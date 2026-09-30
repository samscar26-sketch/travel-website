const express = require('express');
const { register, login, getProfile, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.patch('/reset-password', protect, resetPassword);

module.exports = router;
