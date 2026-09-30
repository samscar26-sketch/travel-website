const { TourGuide, User, TourPackage } = require('../models');

const getGuides = async (req, res) => {
  try {
    const guides = await TourGuide.findAll({
      include: [
        { model: User, as: 'user' },
        { model: TourPackage, as: 'tourPackage' }
      ]
    });
    return res.status(200).json({ success: true, data: guides });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createGuide = async (req, res) => {
  try {
    const guide = await TourGuide.create(req.body);
    return res.status(201).json({ success: true, message: 'Tour guide created successfully.', data: guide });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateGuide = async (req, res) => {
  try {
    const guide = await TourGuide.findByPk(req.params.id);
    if (!guide) {
      return res.status(404).json({ success: false, message: 'Guide not found.' });
    }

    const updated = await guide.update(req.body);
    return res.status(200).json({ success: true, message: 'Guide updated successfully.', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getGuides,
  createGuide,
  updateGuide
};
