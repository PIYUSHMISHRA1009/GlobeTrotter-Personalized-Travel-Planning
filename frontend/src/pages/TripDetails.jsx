/*
 * FILE: pages/TripDetails.jsx
 * PURPOSE: View and edit trip details with cities and activities
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tripAPI } from '../utils/api';
import Layout from '../components/Layout';
import { CityCard, EmptyState } from '../components/Card';
import { ButtonLink } from '../components/Button';

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

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-32 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center py-16">
          <div className="text-red-600 mb-4">{error}</div>
          <button 
            onClick={() => navigate('/dashboard')} 
            className="px-6 py-3 bg-[#FF385C] text-white rounded-xl font-medium hover:bg-[#E31C5F]"
          >
            Back to Dashboard
          </button>
        </div>
      </Layout>
    );
  }

  const totalCost = cities.reduce((sum, city) => {
    const cityCost = (city.activities || []).reduce(
      (citySum, activity) => citySum + (activity.cost || 0),
      0
    );
    return sum + cityCost;
  }, 0);

  const totalActivities = cities.reduce((sum, city) => sum + (city.activities?.length || 0), 0);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to trips
        </button>

        {/* Trip Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">{trip.title}</h1>
          <p className="text-gray-500">{trip.description}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 rounded-2xl p-5">
            <p className="text-sm text-gray-500 mb-1">Cities</p>
            <p className="text-2xl font-semibold text-gray-900">{cities.length}</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-5">
            <p className="text-sm text-gray-500 mb-1">Activities</p>
            <p className="text-2xl font-semibold text-gray-900">{totalActivities}</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-5">
            <p className="text-sm text-gray-500 mb-1">Total cost</p>
            <p className="text-2xl font-semibold text-gray-900">${totalCost}</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-8" />

        {/* Cities Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Itinerary</h2>
            <Link
              to={`/trip/${tripId}/add-city`}
              className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:underline"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add city
            </Link>
          </div>

          {cities.length === 0 ? (
            <EmptyState
              icon="🏙️"
              title="No cities added yet"
              message="Start building your itinerary by adding your first destination!"
              action={<ButtonLink to={`/trip/${tripId}/add-city`} size="lg">Add Your First City</ButtonLink>}
            />
          ) : (
            <div className="space-y-4">
              {cities.map((city, index) => (
                <CityCard key={city._id} city={city}>
                  <Link
                    to={`/city/${city._id}/add-activity`}
                    className="text-sm text-[#FF385C] hover:underline font-medium"
                  >
                    + Add activity
                  </Link>
                </CityCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
