const express = require('express');
const { getTours, getTourById, createTour, updateTour, deleteTour } = require('../controllers/tourController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getTours);
router.get('/:id', protect, getTourById);
router.post('/', protect, authorize('administrator', 'tour_manager'), createTour);
router.put('/:id', protect, authorize('administrator', 'tour_manager'), updateTour);
router.delete('/:id', protect, authorize('administrator', 'tour_manager'), deleteTour);

module.exports = router;
