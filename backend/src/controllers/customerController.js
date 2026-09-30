const { Customer, User } = require('../models');

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      include: [{ model: User, as: 'user' }]
    });

    return res.status(200).json({ success: true, data: customers });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id, {
      include: [{ model: User, as: 'user' }]
    });

    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found.' });
    }

    return res.status(200).json({ success: true, data: customer });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createCustomerProfile = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    return res.status(201).json({ success: true, message: 'Customer profile created successfully.', data: customer });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateCustomerProfile = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer profile not found.' });
    }

    const updated = await customer.update(req.body);
    return res.status(200).json({ success: true, message: 'Customer profile updated successfully.', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomerProfile,
  updateCustomerProfile
};
