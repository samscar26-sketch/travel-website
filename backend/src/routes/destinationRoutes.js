const express = require('express');
const {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination
} = require('../controllers/destinationController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getDestinations);
router.get('/:id', protect, getDestinationById);
router.post('/', protect, authorize('administrator', 'tour_manager'), createDestination);
router.put('/:id', protect, authorize('administrator', 'tour_manager'), updateDestination);
router.delete('/:id', protect, authorize('administrator'), deleteDestination);

module.exports = router;
