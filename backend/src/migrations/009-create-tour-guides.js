module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tour_guides', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tour_package_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'tour_packages',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      license_number: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      experience_years: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      availability: {
        type: Sequelize.ENUM('available', 'busy', 'unavailable'),
        allowNull: false,
        defaultValue: 'available'
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('tour_guides');
  }
};
