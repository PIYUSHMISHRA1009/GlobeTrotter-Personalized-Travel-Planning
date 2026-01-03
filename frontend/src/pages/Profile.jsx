/*
 * FILE: pages/Profile.jsx
 * PURPOSE: User profile screen showing user details and trip history
 */

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { tripAPI } from '../utils/api';
import Layout from '../components/Layout';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await tripAPI.getAllTrips();
      setTrips(response.data.trips || []);
    } catch (err) {
      console.error('Failed to load trips');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-start gap-6 mb-10">
          <div className="w-28 h-28 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
            <span className="text-4xl font-medium text-white">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="pt-2">
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              {user?.name || 'N/A'}
            </h1>
            <p className="text-gray-500 mb-3">{user?.email || 'N/A'}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Identity verified
            </div>
          </div>
        </div>

        <hr className="border-gray-200 mb-10" />

        {/* Stats */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{user?.name?.split(' ')[0]}'s confirmed information</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-6 border border-gray-200 rounded-2xl">
              <p className="text-3xl font-semibold text-gray-900 mb-1">{trips.length}</p>
              <p className="text-sm text-gray-500">Trips planned</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-2xl">
              <p className="text-3xl font-semibold text-gray-900 mb-1">0</p>
              <p className="text-sm text-gray-500">Countries</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-2xl">
              <p className="text-3xl font-semibold text-gray-900 mb-1">0</p>
              <p className="text-sm text-gray-500">Cities</p>
            </div>
          </div>
        </div>

        <hr className="border-gray-200 mb-10" />

        {/* Travel History */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your trips</h2>
            <span className="text-gray-400">→</span>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse flex gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : trips.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No trips created yet.</p>
              <Link 
                to="/create-trip"
                className="inline-block px-6 py-3 bg-[#FF385C] text-white rounded-xl font-medium hover:bg-[#E31C5F]"
              >
                Plan your first trip
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {trips.map((trip) => (
                <Link
                  key={trip._id}
                  to={`/trip/${trip._id}`}
                  className="flex gap-4 p-4 rounded-2xl border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-rose-100 to-orange-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">🗺️</span>
                  </div>
                  <div className="flex-1 min-w-0 py-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{trip.title}</h3>
                    <p className="text-gray-500 text-sm mb-2 line-clamp-1">{trip.description}</p>
                    <p className="text-gray-400 text-xs">
                      {new Date(trip.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
