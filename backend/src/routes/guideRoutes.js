const express = require('express');
const { getGuides, createGuide, updateGuide } = require('../controllers/guideController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, authorize('administrator', 'tour_manager', 'tour_guide'), getGuides);
router.post('/', protect, authorize('administrator', 'tour_manager'), createGuide);
router.put('/:id', protect, authorize('administrator', 'tour_manager'), updateGuide);

module.exports = router;
