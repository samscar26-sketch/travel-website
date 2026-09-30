module.exports = (sequelize, DataTypes) => {
  const TourGuide = sequelize.define('TourGuide', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    tour_package_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tour_packages',
        key: 'id'
      }
    },
    license_number: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    experience_years: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    availability: {
      type: DataTypes.ENUM('available', 'busy', 'unavailable'),
      allowNull: false,
      defaultValue: 'available'
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'tour_guides',
    timestamps: true,
    underscored: true
  });

  return TourGuide;
};
