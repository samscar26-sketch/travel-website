module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tour_package_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tour_packages',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'activities',
    timestamps: true,
    underscored: true
  });

  return Activity;
};
