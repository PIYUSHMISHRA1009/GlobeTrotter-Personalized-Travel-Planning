/*
 * FILE: pages/Search.jsx
 * PURPOSE: Search and discover cities and activities
 */

import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card } from '../components/Card';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for search
  const mockCities = [
    {
      id: 1,
      name: 'Paris',
      country: 'France',
      activities: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame'],
    },
    {
      id: 2,
      name: 'Tokyo',
      country: 'Japan',
      activities: ['Senso-ji Temple', 'Meiji Shrine', 'Shibuya Crossing'],
    },
    {
      id: 3,
      name: 'New York',
      country: 'USA',
      activities: ['Statue of Liberty', 'Central Park', 'Times Square'],
    },
    {
      id: 4,
      name: 'Rome',
      country: 'Italy',
      activities: ['Colosseum', 'Vatican City', 'Roman Forum'],
    },
    {
      id: 5,
      name: 'Bangkok',
      country: 'Thailand',
      activities: ['Grand Palace', 'Wat Pho', 'Floating Markets'],
    },
  ];

  const filteredCities = mockCities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Destinations</h1>
        <p className="text-gray-500 mb-8">Discover cities and popular activities around the world</p>

        {/* Search Bar */}
        <Card className="p-6 mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search by city or country..."
          />
        </Card>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-12">
              No cities found. Try a different search.
            </div>
          ) : (
            filteredCities.map((city) => (
              <Card key={city.id} className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {city.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4">{city.country}</p>
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Popular Activities:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {city.activities.map((activity, idx) => (
                      <li key={idx}>• {activity}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
