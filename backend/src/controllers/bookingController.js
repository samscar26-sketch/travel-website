const { Booking, BookingDetail, Customer, TourPackage, Payment, Vehicle } = require('../models');

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: Customer, as: 'customer' },
        { model: TourPackage, as: 'tourPackage' },
        { model: Vehicle, as: 'vehicle' },
        { model: Payment, as: 'payments' },
        { model: BookingDetail, as: 'details' }
      ]
    });

    return res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: [
        { model: Customer, as: 'customer' },
        { model: TourPackage, as: 'tourPackage' },
        { model: Vehicle, as: 'vehicle' },
        { model: Payment, as: 'payments' },
        { model: BookingDetail, as: 'details' }
      ]
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    return res.status(200).json({ success: true, data: booking });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createBooking = async (req, res) => {
  try {
    const { customerId, tourPackageId, travelDate, numberOfTravelers, notes, details } = req.body;

    const booking = await Booking.create({
      customer_id: customerId,
      tour_package_id: tourPackageId,
      travel_date: travelDate,
      number_of_travelers: numberOfTravelers,
      notes,
      total_amount: 0,
      status: 'pending'
    });

    if (Array.isArray(details) && details.length > 0) {
      const detailRecords = details.map((detail) => ({
        booking_id: booking.id,
        traveler_name: detail.travelerName,
        traveler_age: detail.travelerAge,
        traveler_id_number: detail.travelerIdNumber,
        room_type: detail.roomType
      }));

      await BookingDetail.bulkCreate(detailRecords);
    }

    return res.status(201).json({ success: true, message: 'Booking created successfully.', data: booking });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    const updated = await booking.update(req.body);
    return res.status(200).json({ success: true, message: 'Booking updated successfully.', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    booking.status = 'cancelled';
    await booking.save();

    return res.status(200).json({ success: true, message: 'Booking cancelled successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getBookings,
  getBookingById,
  createBooking,
  updateBooking,
  cancelBooking
};
