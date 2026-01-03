/*
 * FILE: pages/Profile.jsx
 * PURPOSE: User profile screen showing user details and trip history
 */

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { tripAPI } from '../utils/api';

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/dashboard" className="text-2xl font-bold text-gray-800">
            GlobeTrotter
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="text-xl font-semibold text-gray-800">
                {user?.name || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="text-xl font-semibold text-gray-800">
                {user?.email || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Total Trips</p>
              <p className="text-xl font-semibold text-gray-800">
                {trips.length}
              </p>
            </div>
          </div>
        </div>

        {/* Travel History */}
        <div className="bg-white rounded-lg shadow p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Travel History</h3>

          {loading ? (
            <p className="text-gray-500">Loading trips...</p>
          ) : trips.length === 0 ? (
            <p className="text-gray-500">No trips created yet.</p>
          ) : (
            <div className="space-y-4">
              {trips.map((trip) => (
                <Link
                  key={trip._id}
                  to={`/trip/${trip._id}`}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                >
                  <h4 className="font-semibold text-gray-800">{trip.title}</h4>
                  <p className="text-gray-600 text-sm">
                    {trip.description}
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    Created: {new Date(trip.createdAt).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
