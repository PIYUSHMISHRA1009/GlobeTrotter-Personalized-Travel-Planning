/*
 * FILE: controllers/trip.controller.js
 * PURPOSE: Handle trip, city, and activity operations
 */

const Trip = require('../models/Trip');
const City = require('../models/City');
const Activity = require('../models/Activity');

const getAllTrips = async (req, res) => {
  try {
    const userId = req.userId;

    const trips = await Trip.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Trips fetched successfully',
      trips,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createTrip = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.userId;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description required' });
    }

    const trip = new Trip({ title, description, user: userId });
    await trip.save();

    res.status(201).json({
      message: 'Trip created successfully',
      trip,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findById(tripId).populate('user');
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const cities = await City.find({ trip: tripId }).populate('activity');
    const activities = await Activity.find();

    res.status(200).json({
      trip,
      cities,
      activities,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createCity = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { name, country } = req.body;

    if (!name || !country) {
      return res.status(400).json({ message: 'Name and country required' });
    }

    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const city = new City({ name, country, trip: tripId });
    await city.save();

    res.status(201).json({
      message: 'City added successfully',
      city,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createActivity = async (req, res) => {
  try {
    const { cityId } = req.params;
    const { name, cost, duration } = req.body;

    if (!name || cost === undefined || !duration) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const city = await City.findById(cityId);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }

    const activity = new Activity({ name, cost, duration, city: cityId });
    await activity.save();

    res.status(201).json({
      message: 'Activity added successfully',
      activity,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllTrips, createTrip, getTrip, createCity, createActivity };
