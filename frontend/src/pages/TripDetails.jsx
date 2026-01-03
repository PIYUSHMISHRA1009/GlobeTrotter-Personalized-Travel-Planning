/*
 * FILE: pages/TripDetails.jsx
 * PURPOSE: View and edit trip details with cities and activities
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { tripAPI } from '../utils/api';
import Layout from '../components/Layout';
import { Card, CityCard, ActivityCard, EmptyState } from '../components/Card';
import { Button, ButtonLink } from '../components/Button';

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
        <div className="text-center text-gray-500 py-12">Loading trip details...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="text-red-600 mb-4">{error}</div>
          <Button onClick={() => navigate('/dashboard')} variant="primary">
            Back to Dashboard
          </Button>
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

  return (
    <Layout>
      {/* Trip Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{trip.title}</h1>
            <p className="text-gray-600 text-lg">{trip.description}</p>
          </div>
          <Button onClick={() => navigate('/dashboard')} variant="secondary">
            ← Back
          </Button>
        </div>
        
        <Card className="p-6 bg-blue-50 border border-blue-100">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Budget</p>
              <p className="text-3xl font-bold text-blue-600">${totalCost}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Cities</p>
              <p className="text-2xl font-semibold text-gray-800">{cities.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Cities Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Itinerary</h2>
          <ButtonLink to={`/trip/${tripId}/add-city`}>
            + Add City
          </ButtonLink>
        </div>

        {cities.length === 0 ? (
          <EmptyState
            icon="🏙️"
            title="No cities added yet"
            message="Start building your itinerary by adding your first destination!"
            action={<ButtonLink to={`/trip/${tripId}/add-city`} size="lg">Add Your First City</ButtonLink>}
          />
        ) : (
          <div className="space-y-6">
            {cities.map((city, index) => (
              <CityCard key={city._id} city={city}>
                <Link
                  to={`/city/${city._id}/add-activity`}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  + Add Activity
                </Link>
              </CityCard>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
