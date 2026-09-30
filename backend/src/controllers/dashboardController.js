const { User, Booking, TourPackage, Customer, Payment } = require('../models');
const { Op } = require('sequelize');

const getDashboardStats = async (req, res) => {
  try {
    const [totalCustomers, totalBookings, totalTours, openBookings, revenue] = await Promise.all([
      Customer.count(),
      Booking.count(),
      TourPackage.count(),
      Booking.count({ where: { status: { [Op.in]: ['pending', 'confirmed'] } } }),
      Payment.sum('amount', { where: { status: 'paid' } })
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalCustomers,
        totalBookings,
        totalTourPackages: totalTours,
        availableTours: totalTours,
        completedTours: await Booking.count({ where: { status: 'completed' } }),
        cancelledBookings: await Booking.count({ where: { status: 'cancelled' } }),
        revenue: Number(revenue || 0),
        popularDestinations: [],
        popularTourPackages: []
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getDashboardStats
};
