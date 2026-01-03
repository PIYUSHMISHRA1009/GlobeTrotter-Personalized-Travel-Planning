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
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
          <p className="text-gray-500 mt-1">Plan, organize, and explore your journeys</p>
        </div>
        <ButtonLink to="/create-trip" size="lg">
          + Create New Trip
        </ButtonLink>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-500 py-12">Loading your trips...</div>
      ) : trips.length === 0 ? (
        <EmptyState
          icon="✈️"
          title="No trips yet"
          message="Start planning your next adventure! Create your first trip to begin."
          action={<ButtonLink to="/create-trip" size="lg">Create Your First Trip</ButtonLink>}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
