module.exports = (sequelize, DataTypes) => {
  const Driver = sequelize.define('Driver', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    full_name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    license_number: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('available', 'busy', 'inactive'),
      allowNull: false,
      defaultValue: 'available'
    }
  }, {
    tableName: 'drivers',
    timestamps: true,
    underscored: true
  });

  return Driver;
};
