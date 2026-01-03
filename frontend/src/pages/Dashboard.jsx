/*
 * FILE: pages/Dashboard.jsx
 * PURPOSE: Main dashboard showing all user trips and create trip button
 */

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { tripAPI } from '../utils/api';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">GlobeTrotter</h1>
            <p className="text-gray-500 text-sm">Welcome, {user?.name}!</p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/profile"
              className="px-4 py-2 text-blue-500 hover:text-blue-700"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">My Trips</h2>
          <Link
            to="/create-trip"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold"
          >
            + Create New Trip
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-500">Loading trips...</div>
        ) : trips.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p className="text-lg mb-4">No trips yet. Create your first trip!</p>
            <Link
              to="/create-trip"
              className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold"
            >
              Create Trip
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <Link
                key={trip._id}
                to={`/trip/${trip._id}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 cursor-pointer"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {trip.title}
                </h3>
                <p className="text-gray-600 mb-4">{trip.description}</p>
                <div className="text-sm text-gray-500">
                  Created: {new Date(trip.createdAt).toLocaleDateString()}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
