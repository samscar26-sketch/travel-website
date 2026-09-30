const validateRegisterInput = (body) => {
  const { firstName, lastName, email, password } = body;

  if (!firstName || !lastName || !email || !password) {
    return 'First name, last name, email, and password are required.';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters long.';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return 'Please provide a valid email address.';
  }

  return null;
};

const validateLoginInput = (body) => {
  const { email, password } = body;

  if (!email || !password) {
    return 'Email and password are required.';
  }

  return null;
};

module.exports = {
  validateRegisterInput,
  validateLoginInput
};
