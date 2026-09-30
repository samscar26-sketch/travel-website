const { User, Role } = require('../models');
const { hashPassword, comparePassword, sanitizeUser } = require('../utils/helpers');
const { generateToken } = require('../middleware/auth');
const { validateRegisterInput, validateLoginInput } = require('../validators/authValidator');
const { logAction } = require('../services/auditService');

const register = async (req, res) => {
  try {
    const validationError = validateRegisterInput(req.body);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const { firstName, lastName, email, password, phone, roleName = 'customer' } = req.body;

    const existingUser = await User.findOne({ where: { email: email.toLowerCase() } });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists.' });
    }

    const role = await Role.findOne({ where: { name: roleName } });
    if (!role) {
      return res.status(400).json({ success: false, message: 'Invalid role provided.' });
    }

    const passwordHash = await hashPassword(password);

    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(),
      password_hash: passwordHash,
      phone,
      role_id: role.id,
      status: 'active'
    });

    await logAction(user.id, 'register', 'user', { email: user.email }, req.ip);

    const token = generateToken(user);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      data: {
        token,
        user: sanitizeUser(user)
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Current password and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters long.' });
    }

    const user = await User.findByPk(req.user.id);
    const isMatch = await comparePassword(currentPassword, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect.' });
    }

    user.password_hash = await hashPassword(newPassword);
    await user.save();

    await logAction(user.id, 'reset_password', 'user', { email: user.email }, req.ip);

    return res.status(200).json({ success: true, message: 'Password reset successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const validationError = validateLoginInput(req.body);
    if (validationError) {
      return res.status(400).json({ success: false, message: validationError });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email: email.toLowerCase() },
      include: [{ model: Role, as: 'role' }]
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const isMatch = await comparePassword(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    if (user.status !== 'active') {
      return res.status(403).json({ success: false, message: 'User account is inactive.' });
    }

    user.last_login_at = new Date();
    await user.save();

    await logAction(user.id, 'login', 'user', { email: user.email }, req.ip);

    const token = generateToken(user);

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: {
        token,
        user: sanitizeUser(user)
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [{ model: Role, as: 'role' }]
    });

    return res.status(200).json({
      success: true,
      data: sanitizeUser(user)
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  resetPassword
};
