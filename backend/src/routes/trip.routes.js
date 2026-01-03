/*
 * FILE: routes/trip.routes.js
 * PURPOSE: Trip, city, and activity routes (protected with auth middleware)
 */

const express = require('express');
const {
  getAllTrips,
  createTrip,
  getTrip,
  createCity,
  createActivity,
} = require('../controllers/trip.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Protected routes
router.get('/', authMiddleware, getAllTrips);
router.post('/', authMiddleware, createTrip);
router.get('/:tripId', authMiddleware, getTrip);
router.post('/:tripId/cities', authMiddleware, createCity);
router.post('/cities/:cityId/activities', authMiddleware, createActivity);

module.exports = router;
