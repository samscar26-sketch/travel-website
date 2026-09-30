const { Role } = require('../models');

const seedRoles = async () => {
  const roles = [
    { name: 'administrator', description: 'System administrator with full access' },
    { name: 'tour_manager', description: 'Manages tours, bookings, and staff operations' },
    { name: 'tour_guide', description: 'Assigned to guide tours and schedules' },
    { name: 'customer', description: 'Books and reviews tours' }
  ];

  for (const role of roles) {
    await Role.findOrCreate({
      where: { name: role.name },
      defaults: role
    });
  }

  console.log('Roles seeded successfully.');
};

module.exports = seedRoles;
