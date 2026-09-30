const { Destination } = require('../models');

const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.findAll();
    return res.status(200).json({ success: true, data: destinations });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found.' });
    }

    return res.status(200).json({ success: true, data: destination });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createDestination = async (req, res) => {
  try {
    const destination = await Destination.create(req.body);
    return res.status(201).json({ success: true, message: 'Destination created successfully.', data: destination });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found.' });
    }

    const updated = await destination.update(req.body);
    return res.status(200).json({ success: true, message: 'Destination updated successfully.', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByPk(req.params.id);
    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found.' });
    }

    await destination.destroy();
    return res.status(200).json({ success: true, message: 'Destination deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination
};
