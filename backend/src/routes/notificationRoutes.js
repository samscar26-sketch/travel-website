const express = require('express');
const { getNotifications, createNotification } = require('../controllers/notificationController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getNotifications);
router.post('/', protect, authorize('administrator', 'tour_manager'), createNotification);

module.exports = router;
