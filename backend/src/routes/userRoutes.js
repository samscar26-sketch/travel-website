const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deactivateUser,
  activateUser
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.get('/', authorize('administrator', 'tour_manager'), getAllUsers);
router.get('/:id', authorize('administrator', 'tour_manager'), getUserById);
router.put('/:id', authorize('administrator', 'tour_manager'), updateUser);
router.patch('/:id/deactivate', authorize('administrator'), deactivateUser);
router.patch('/:id/activate', authorize('administrator'), activateUser);

module.exports = router;
