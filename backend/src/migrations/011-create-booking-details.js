module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('booking_details', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      booking_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'bookings',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      traveler_name: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      traveler_age: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      traveler_id_number: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      room_type: {
        type: Sequelize.STRING(100),
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
    await queryInterface.dropTable('booking_details');
  }
};
