const { Payment, Booking } = require('../models');

const getPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({ include: [{ model: Booking, as: 'booking' }] });
    return res.status(200).json({ success: true, data: payments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id, { include: [{ model: Booking, as: 'booking' }] });
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment record not found.' });
    }

    return res.status(200).json({ success: true, data: payment });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    return res.status(201).json({ success: true, message: 'Payment recorded successfully.', data: payment });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found.' });
    }

    const updated = await payment.update(req.body);
    return res.status(200).json({ success: true, message: 'Payment updated successfully.', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPayments,
  getPaymentById,
  createPayment,
  updatePayment
};
