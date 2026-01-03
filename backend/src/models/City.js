/*
 * FILE: models/City.js
 * PURPOSE: City schema with reference to Trip
 */

const mongoose = require('mongoose');

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('City', citySchema);
