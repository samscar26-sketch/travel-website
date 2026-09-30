const { Review, Booking, Customer } = require('../models');

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        { model: Booking, as: 'booking' },
        { model: Customer, as: 'customer' }
      ]
    });
    return res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    return res.status(201).json({ success: true, message: 'Review submitted successfully.', data: review });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateReviewStatus = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found.' });
    }

    review.status = req.body.status || review.status;
    await review.save();

    return res.status(200).json({ success: true, message: 'Review status updated successfully.', data: review });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getReviews,
  createReview,
  updateReviewStatus
};
