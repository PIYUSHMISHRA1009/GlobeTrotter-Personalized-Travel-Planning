/*
 * FILE: pages/TripDetails.jsx
 * PURPOSE: View and edit trip details with cities and activities
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tripAPI } from '../utils/api';

export default function TripDetails() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTripDetails();
  }, [tripId]);

  const fetchTripDetails = async () => {
    try {
      setLoading(true);
      const response = await tripAPI.getTripDetails(tripId);
      setTrip(response.data.trip);
      setCities(response.data.cities || []);
    } catch (err) {
      setError('Failed to load trip details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  if (error)
    return (
      <div className="text-center py-12 text-red-600">
        {error}
        <button
          onClick={() => navigate('/dashboard')}
          className="block mt-4 px-4 py-2 bg-blue-500 text-white rounded mx-auto"
        >
          Back to Dashboard
        </button>
      </div>
    );

  const totalCost = cities.reduce((sum, city) => {
    const cityCost = (city.activities || []).reduce(
      (citySum, activity) => citySum + (activity.cost || 0),
      0
    );
    return sum + cityCost;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Trip Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">{trip.title}</h1>
              <p className="text-gray-600 mt-2">{trip.description}</p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Back
            </button>
          </div>
          <div className="text-lg font-semibold text-blue-600">
            Total Budget: ${totalCost}
          </div>
        </div>

        {/* Cities and Activities */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Cities</h2>
            <Link
              to={`/trip/${tripId}/add-city`}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              + Add City
            </Link>
          </div>

          {cities.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              No cities added yet. Start planning your trip!
            </div>
          ) : (
            <div className="space-y-4">
              {cities.map((city) => (
                <div key={city._id} className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    {city.name}, {city.country}
                  </h3>

                  {/* Activities */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-gray-700">Activities</h4>
                      <Link
                        to={`/city/${city._id}/add-activity`}
                        className="text-blue-500 hover:underline text-sm"
                      >
                        + Add Activity
                      </Link>
                    </div>

                    {city.activities && city.activities.length > 0 ? (
                      <ul className="space-y-2">
                        {city.activities.map((activity) => (
                          <li
                            key={activity._id}
                            className="flex justify-between p-3 bg-gray-100 rounded"
                          >
                            <div>
                              <p className="font-semibold text-gray-700">
                                {activity.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                Duration: {activity.duration}
                              </p>
                            </div>
                            <p className="font-semibold text-green-600">
                              ${activity.cost}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        No activities yet
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
