module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    registration_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    vehicle_type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    driver_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'drivers',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('available', 'in_use', 'maintenance'),
      allowNull: false,
      defaultValue: 'available'
    }
  }, {
    tableName: 'vehicles',
    timestamps: true,
    underscored: true
  });

  return Vehicle;
};
