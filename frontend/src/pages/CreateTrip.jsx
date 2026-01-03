/*
 * FILE: pages/CreateTrip.jsx
 * PURPOSE: Form to create a new trip with title and description
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripAPI } from '../utils/api';

export default function CreateTrip() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateTrip = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await tripAPI.createTrip(title, description);
      navigate(`/trip/${response.data.trip._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create trip');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Create New Trip</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
            {error}
          </div>
        )}

        <form
          onSubmit={handleCreateTrip}
          className="bg-white rounded-lg shadow p-8"
        >
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Trip Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., European Adventure"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Trip Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              placeholder="Describe your trip..."
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition"
            >
              {loading ? 'Creating...' : 'Create Trip'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
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
