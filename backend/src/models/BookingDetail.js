module.exports = (sequelize, DataTypes) => {
  const BookingDetail = sequelize.define('BookingDetail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bookings',
        key: 'id'
      }
    },
    traveler_name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    traveler_age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    traveler_id_number: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    room_type: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'booking_details',
    timestamps: true,
    underscored: true
  });

  return BookingDetail;
};
