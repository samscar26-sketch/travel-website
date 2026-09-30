const express = require('express');
const { getDrivers, createDriver, updateDriver } = require('../controllers/driverController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, authorize('administrator', 'tour_manager', 'tour_guide'), getDrivers);
router.post('/', protect, authorize('administrator', 'tour_manager'), createDriver);
router.put('/:id', protect, authorize('administrator', 'tour_manager'), updateDriver);

module.exports = router;
