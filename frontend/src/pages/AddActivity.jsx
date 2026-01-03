/*
 * FILE: pages/AddActivity.jsx
 * PURPOSE: Form to add an activity to a city
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tripAPI } from '../utils/api';

export default function AddActivity() {
  const { cityId, tripId } = useParams();
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddActivity = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await tripAPI.addActivity(cityId, name, parseFloat(cost), duration);
      navigate(`/trip/${tripId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add activity');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Add Activity</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
            {error}
          </div>
        )}

        <form
          onSubmit={handleAddActivity}
          className="bg-white rounded-lg shadow p-8"
        >
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Activity Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Eiffel Tower Visit"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Cost ($)
            </label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 25"
              step="0.01"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Duration
            </label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 2 hours"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition"
            >
              {loading ? 'Adding...' : 'Add Activity'}
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
