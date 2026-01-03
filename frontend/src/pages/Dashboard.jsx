/*
 * FILE: pages/Dashboard.jsx
 * PURPOSE: Main dashboard showing all user trips and create trip button
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripAPI } from '../utils/api';
import Layout from '../components/Layout';
import { TripCard, EmptyState } from '../components/Card';
import { ButtonLink } from '../components/Button';

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const response = await tripAPI.getAllTrips();
      setTrips(response.data.trips || []);
    } catch (err) {
      setError('Failed to load trips');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Section Header - Airbnb style */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold text-gray-900">Your trips</h1>
          <span className="text-gray-400">→</span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-xl mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : trips.length === 0 ? (
        <EmptyState
          icon="✈️"
          title="No trips yet"
          message="Start planning your next adventure! Create your first trip to begin."
          action={<ButtonLink to="/create-trip" size="lg">Create Your First Trip</ButtonLink>}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {trips.map((trip) => (
            <TripCard
              key={trip._id}
              trip={trip}
              onClick={() => navigate(`/trip/${trip._id}`)}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}
