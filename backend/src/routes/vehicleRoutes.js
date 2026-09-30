const express = require('express');
const { getVehicles, createVehicle, updateVehicle } = require('../controllers/vehicleController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, authorize('administrator', 'tour_manager', 'tour_guide'), getVehicles);
router.post('/', protect, authorize('administrator', 'tour_manager'), createVehicle);
router.put('/:id', protect, authorize('administrator', 'tour_manager'), updateVehicle);

module.exports = router;
