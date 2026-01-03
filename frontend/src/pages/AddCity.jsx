/*
 * FILE: pages/AddCity.jsx
 * PURPOSE: Form to add a city to an existing trip
 */

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tripAPI } from '../utils/api';
import Layout from '../components/Layout';

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
          <h1 className="text-3xl font-semibold text-gray-900">Add a city</h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleAddCity}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                City name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-base"
                placeholder="e.g., Paris"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Country
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-base"
                placeholder="e.g., France"
                required
              />
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
              {loading ? 'Adding...' : 'Add city'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
