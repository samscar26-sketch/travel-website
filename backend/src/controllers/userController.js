const { User, Role } = require('../models');
const { sanitizeUser } = require('../utils/helpers');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Role, as: 'role' }],
      attributes: { exclude: ['password_hash'] }
    });

    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Role, as: 'role' }],
      attributes: { exclude: ['password_hash'] }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const updated = await user.update(req.body);

    return res.status(200).json({
      success: true,
      message: 'User updated successfully.',
      data: sanitizeUser(updated)
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deactivateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    user.status = 'inactive';
    await user.save();

    return res.status(200).json({ success: true, message: 'User deactivated successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const activateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    user.status = 'active';
    await user.save();

    return res.status(200).json({ success: true, message: 'User activated successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deactivateUser,
  activateUser
};
