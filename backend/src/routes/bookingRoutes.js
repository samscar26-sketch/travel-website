const express = require('express');
const { getBookings, getBookingById, createBooking, updateBooking, cancelBooking } = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, authorize('administrator', 'tour_manager', 'customer'), getBookings);
router.get('/:id', protect, authorize('administrator', 'tour_manager', 'customer'), getBookingById);
router.post('/', protect, authorize('customer'), createBooking);
router.put('/:id', protect, authorize('administrator', 'tour_manager'), updateBooking);
router.patch('/:id/cancel', protect, authorize('customer', 'administrator', 'tour_manager'), cancelBooking);

module.exports = router;
