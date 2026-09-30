const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const sanitizeUser = (user) => {
  if (!user) return null;

  const userData = user.toJSON ? user.toJSON() : { ...user };
  delete userData.password_hash;
  return userData;
};

module.exports = {
  hashPassword,
  comparePassword,
  sanitizeUser
};
