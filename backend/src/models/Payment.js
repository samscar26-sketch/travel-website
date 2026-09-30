module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
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
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0
    },
    payment_method: {
      type: DataTypes.ENUM('cash', 'bank_transfer', 'card', 'mpesa', 'wallet'),
      allowNull: false,
      defaultValue: 'cash'
    },
    status: {
      type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
      allowNull: false,
      defaultValue: 'pending'
    },
    transaction_reference: {
      type: DataTypes.STRING(150),
      allowNull: true,
      unique: true
    },
    receipt_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'payments',
    timestamps: true,
    underscored: true
  });

  return Payment;
};
