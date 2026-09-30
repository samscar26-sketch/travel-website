const { Vehicle, Driver } = require('../models');

const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({ include: [{ model: Driver, as: 'driver' }] });
    return res.status(200).json({ success: true, data: vehicles });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    return res.status(201).json({ success: true, message: 'Vehicle created successfully.', data: vehicle });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found.' });
    }

    const updated = await vehicle.update(req.body);
    return res.status(200).json({ success: true, message: 'Vehicle updated successfully.', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getVehicles,
  createVehicle,
  updateVehicle
};
