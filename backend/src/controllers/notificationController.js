const { Notification, User } = require('../models');

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { user_id: req.user.id },
      include: [{ model: User, as: 'user' }]
    });

    return res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createNotification = async (req, res) => {
  try {
    const notification = await Notification.create({
      user_id: req.user.id,
      title: req.body.title,
      message: req.body.message,
      type: req.body.type || 'system',
      is_read: false
    });

    return res.status(201).json({ success: true, message: 'Notification created successfully.', data: notification });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getNotifications,
  createNotification
};
