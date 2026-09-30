const express = require('express');
const { getPayments, getPaymentById, createPayment, updatePayment } = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, authorize('administrator', 'tour_manager', 'customer'), getPayments);
router.get('/:id', protect, authorize('administrator', 'tour_manager', 'customer'), getPaymentById);
router.post('/', protect, authorize('customer', 'administrator', 'tour_manager'), createPayment);
router.put('/:id', protect, authorize('administrator', 'tour_manager'), updatePayment);

module.exports = router;
