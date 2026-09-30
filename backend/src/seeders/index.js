const sequelize = require('../config/sequelize');
const seedRoles = require('./seedRoles');

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    await seedRoles();
    console.log('Database seeding completed.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
})();
