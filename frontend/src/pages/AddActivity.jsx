/*
 * FILE: pages/AddActivity.jsx
 * PURPOSE: Form to add an activity to a city
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tripAPI } from '../utils/api';
import Layout from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

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
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Activity</h1>
        <p className="text-gray-500 mb-8">Add an activity to your city itinerary</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <Card className="p-8">
          <form onSubmit={handleAddActivity}>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Activity Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 25"
                step="0.01"
                required
              />
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 font-semibold mb-2">
                Duration
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 2 hours"
                required
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                variant="primary"
                size="lg"
                className="flex-1"
              >
                {loading ? 'Adding...' : 'Add Activity'}
              </Button>
              <Button
                type="button"
                onClick={() => navigate(`/trip/${tripId}`)}
                variant="secondary"
                size="lg"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
