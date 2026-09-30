const { AuditLog } = require('../models');

const logAction = async (userId, action, entity, details, ipAddress) => {
  try {
    await AuditLog.create({
      user_id: userId || null,
      action,
      entity,
      details: details ? JSON.stringify(details) : null,
      ip_address: ipAddress || null
    });
  } catch (error) {
    console.error('Audit log failed:', error.message);
  }
};

module.exports = {
  logAction
};
