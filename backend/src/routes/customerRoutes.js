const express = require('express');
const {
  getCustomers,
  getCustomerById,
  createCustomerProfile,
  updateCustomerProfile
} = require('../controllers/customerController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, authorize('administrator', 'tour_manager'), getCustomers);
router.get('/:id', protect, authorize('administrator', 'tour_manager', 'customer'), getCustomerById);
router.post('/', protect, authorize('administrator', 'tour_manager'), createCustomerProfile);
router.put('/:id', protect, authorize('administrator', 'tour_manager', 'customer'), updateCustomerProfile);

module.exports = router;
