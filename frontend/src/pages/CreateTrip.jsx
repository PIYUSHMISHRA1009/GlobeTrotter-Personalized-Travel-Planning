/*
 * FILE: pages/CreateTrip.jsx
 * PURPOSE: Form to create a new trip with title and description
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripAPI } from '../utils/api';
import Layout from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

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
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Trip</h1>
        <p className="text-gray-500 mb-8">Start planning your next adventure</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <Card className="p-8">
          <form onSubmit={handleCreateTrip}>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Trip Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., European Adventure"
                required
              />
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 font-semibold mb-2">
                Trip Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
                placeholder="Describe your trip..."
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
                {loading ? 'Creating...' : 'Create Trip'}
              </Button>
              <Button
                type="button"
                onClick={() => navigate('/dashboard')}
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
