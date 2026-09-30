const { Sequelize } = require('sequelize');
const sequelize = require('../config/sequelize');

const Role = require('./Role')(sequelize, Sequelize.DataTypes);
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Customer = require('./Customer')(sequelize, Sequelize.DataTypes);
const Destination = require('./Destination')(sequelize, Sequelize.DataTypes);
const Activity = require('./Activity')(sequelize, Sequelize.DataTypes);
const TourPackage = require('./TourPackage')(sequelize, Sequelize.DataTypes);
const Booking = require('./Booking')(sequelize, Sequelize.DataTypes);
const BookingDetail = require('./BookingDetail')(sequelize, Sequelize.DataTypes);
const Payment = require('./Payment')(sequelize, Sequelize.DataTypes);
const TourGuide = require('./TourGuide')(sequelize, Sequelize.DataTypes);
const Driver = require('./Driver')(sequelize, Sequelize.DataTypes);
const Vehicle = require('./Vehicle')(sequelize, Sequelize.DataTypes);
const Review = require('./Review')(sequelize, Sequelize.DataTypes);
const Notification = require('./Notification')(sequelize, Sequelize.DataTypes);
const AuditLog = require('./AuditLog')(sequelize, Sequelize.DataTypes);

Role.hasMany(User, { foreignKey: 'role_id', as: 'users' });
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });

User.hasOne(Customer, { foreignKey: 'user_id', as: 'customerProfile' });
Customer.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Destination.hasMany(TourPackage, { foreignKey: 'destination_id', as: 'tourPackages' });
TourPackage.belongsTo(Destination, { foreignKey: 'destination_id', as: 'destination' });

TourPackage.hasMany(Activity, { foreignKey: 'tour_package_id', as: 'activities' });
Activity.belongsTo(TourPackage, { foreignKey: 'tour_package_id', as: 'tourPackage' });

Customer.hasMany(Booking, { foreignKey: 'customer_id', as: 'bookings' });
Booking.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });

TourPackage.hasMany(Booking, { foreignKey: 'tour_package_id', as: 'bookings' });
Booking.belongsTo(TourPackage, { foreignKey: 'tour_package_id', as: 'tourPackage' });

Booking.hasMany(BookingDetail, { foreignKey: 'booking_id', as: 'details' });
BookingDetail.belongsTo(Booking, { foreignKey: 'booking_id', as: 'booking' });

Booking.hasMany(Payment, { foreignKey: 'booking_id', as: 'payments' });
Payment.belongsTo(Booking, { foreignKey: 'booking_id', as: 'booking' });

User.hasMany(TourGuide, { foreignKey: 'user_id', as: 'guideProfiles' });
TourGuide.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

TourPackage.hasMany(TourGuide, { foreignKey: 'tour_package_id', as: 'assignedGuides' });
TourGuide.belongsTo(TourPackage, { foreignKey: 'tour_package_id', as: 'tourPackage' });

Vehicle.hasMany(Booking, { foreignKey: 'vehicle_id', as: 'bookedTours' });
Booking.belongsTo(Vehicle, { foreignKey: 'vehicle_id', as: 'vehicle' });

Driver.hasMany(Vehicle, { foreignKey: 'driver_id', as: 'vehicles' });
Vehicle.belongsTo(Driver, { foreignKey: 'driver_id', as: 'driver' });

Booking.hasMany(Review, { foreignKey: 'booking_id', as: 'reviews' });
Review.belongsTo(Booking, { foreignKey: 'booking_id', as: 'booking' });

Customer.hasMany(Review, { foreignKey: 'customer_id', as: 'reviews' });
Review.belongsTo(Customer, { foreignKey: 'customer_id', as: 'customer' });

User.hasMany(Notification, { foreignKey: 'user_id', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(AuditLog, { foreignKey: 'user_id', as: 'auditLogs' });
AuditLog.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = {
  sequelize,
  Role,
  User,
  Customer,
  Destination,
  Activity,
  TourPackage,
  Booking,
  BookingDetail,
  Payment,
  TourGuide,
  Driver,
  Vehicle,
  Review,
  Notification,
  AuditLog
};
