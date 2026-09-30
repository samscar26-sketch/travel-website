const express = require('express');
const { getReviews, createReview, updateReviewStatus } = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getReviews);
router.post('/', protect, authorize('customer'), createReview);
router.patch('/:id', protect, authorize('administrator'), updateReviewStatus);

module.exports = router;
