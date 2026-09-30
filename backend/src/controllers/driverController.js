const { Driver, Vehicle } = require('../models');

const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.findAll({
      include: [{ model: Vehicle, as: 'vehicles' }]
    });

    return res.status(200).json({ success: true, data: drivers });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createDriver = async (req, res) => {
  try {
    const driver = await Driver.create(req.body);
    return res.status(201).json({ success: true, message: 'Driver created successfully.', data: driver });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateDriver = async (req, res) => {
  try {
    const driver = await Driver.findByPk(req.params.id);
    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found.' });
    }

    const updated = await driver.update(req.body);
    return res.status(200).json({ success: true, message: 'Driver updated successfully.', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getDrivers,
  createDriver,
  updateDriver
};
