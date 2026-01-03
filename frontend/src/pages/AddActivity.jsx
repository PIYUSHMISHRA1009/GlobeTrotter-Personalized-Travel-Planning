/*
 * FILE: pages/AddActivity.jsx
 * PURPOSE: Form to add an activity to a city
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tripAPI } from '../utils/api';
import Layout from '../components/Layout';

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
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate(`/trip/${tripId}`)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-3xl font-semibold text-gray-900">Add an activity</h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleAddActivity}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Activity name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-base"
                placeholder="e.g., Eiffel Tower Visit"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Cost ($)
                </label>
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-base"
                  placeholder="25"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-base"
                  placeholder="2 hours"
                  required
                />
              </div>
            </div>
          </div>

          <hr className="my-8 border-gray-200" />

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(`/trip/${tripId}`)}
              className="flex-1 py-3 px-6 border border-gray-900 rounded-xl text-gray-900 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-6 bg-[#FF385C] text-white rounded-xl font-medium hover:bg-[#E31C5F] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Adding...' : 'Add activity'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
