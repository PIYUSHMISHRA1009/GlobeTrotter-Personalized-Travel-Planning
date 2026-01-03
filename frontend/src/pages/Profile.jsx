/*
 * FILE: pages/Profile.jsx
 * PURPOSE: User profile screen showing user details and trip history
 */

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { tripAPI } from '../utils/api';
import Layout from '../components/Layout';
import { Card } from '../components/Card';

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        {/* Profile Info Card */}
        <Card className="p-8 mb-8">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-4xl font-bold text-blue-600">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {user?.name || 'N/A'}
              </h2>
              <p className="text-gray-500">{user?.email || 'N/A'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600 mb-1">{trips.length}</p>
              <p className="text-gray-600 text-sm">Total Trips</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600 mb-1">0</p>
              <p className="text-gray-600 text-sm">Countries Visited</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600 mb-1">0</p>
              <p className="text-gray-600 text-sm">Cities Explored</p>
            </div>
          </div>
        </Card>

        {/* Travel History */}
        <Card className="p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Travel History</h3>

          {loading ? (
            <p className="text-gray-500 text-center py-8">Loading trips...</p>
          ) : trips.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No trips created yet.</p>
          ) : (
            <div className="space-y-3">
              {trips.map((trip) => (
                <Link
                  key={trip._id}
                  to={`/trip/${trip._id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition"
                >
                  <h4 className="font-semibold text-gray-800 mb-1">{trip.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{trip.description}</p>
                  <p className="text-gray-400 text-xs">
                    Created {new Date(trip.createdAt).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
}
