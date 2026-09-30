const { TourPackage, Destination, Activity } = require('../models');

const getTours = async (req, res) => {
  try {
    const tours = await TourPackage.findAll({
      include: [
        { model: Destination, as: 'destination' },
        { model: Activity, as: 'activities' }
      ]
    });

    return res.status(200).json({ success: true, data: tours });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getTourById = async (req, res) => {
  try {
    const tour = await TourPackage.findByPk(req.params.id, {
      include: [
        { model: Destination, as: 'destination' },
        { model: Activity, as: 'activities' }
      ]
    });

    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour package not found.' });
    }

    return res.status(200).json({ success: true, data: tour });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createTour = async (req, res) => {
  try {
    const { destinationId, title, description, price, durationDays, maxTravelers, availableDates, imageUrl, status } = req.body;

    const tour = await TourPackage.create({
      destination_id: destinationId,
      title,
      description,
      price,
      duration_days: durationDays,
      max_travelers: maxTravelers,
      available_dates: JSON.stringify(availableDates || []),
      image_url: imageUrl,
      status: status || 'published'
    });

    return res.status(201).json({ success: true, message: 'Tour package created successfully.', data: tour });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateTour = async (req, res) => {
  try {
    const tour = await TourPackage.findByPk(req.params.id);

    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour package not found.' });
    }

    if (req.body.availableDates) {
      req.body.available_dates = JSON.stringify(req.body.availableDates);
      delete req.body.availableDates;
    }

    if (req.body.durationDays) {
      req.body.duration_days = req.body.durationDays;
      delete req.body.durationDays;
    }

    if (req.body.maxTravelers) {
      req.body.max_travelers = req.body.maxTravelers;
      delete req.body.maxTravelers;
    }

    if (req.body.destinationId) {
      req.body.destination_id = req.body.destinationId;
      delete req.body.destinationId;
    }

    if (req.body.imageUrl) {
      req.body.image_url = req.body.imageUrl;
      delete req.body.imageUrl;
    }

    const updated = await tour.update(req.body);

    return res.status(200).json({ success: true, message: 'Tour package updated successfully.', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTour = async (req, res) => {
  try {
    const tour = await TourPackage.findByPk(req.params.id);

    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour package not found.' });
    }

    await tour.destroy();

    return res.status(200).json({ success: true, message: 'Tour package deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour
};
