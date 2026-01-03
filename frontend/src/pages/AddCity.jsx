/*
 * FILE: pages/AddCity.jsx
 * PURPOSE: Form to add a city to an existing trip
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tripAPI } from '../utils/api';

export default function AddCity() {
  const { tripId } = useParams();
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddCity = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await tripAPI.addCity(tripId, name, country);
      navigate(`/trip/${tripId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add city');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Add City to Trip</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
            {error}
          </div>
        )}

        <form
          onSubmit={handleAddCity}
          className="bg-white rounded-lg shadow p-8"
        >
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              City Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Paris"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Country
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., France"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition"
            >
              {loading ? 'Adding...' : 'Add City'}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/trip/${tripId}`)}
              className="flex-1 bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
