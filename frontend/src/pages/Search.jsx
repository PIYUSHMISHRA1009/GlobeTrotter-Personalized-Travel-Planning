/*
 * FILE: pages/Search.jsx
 * PURPOSE: Search and discover cities and activities
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Discover Cities</h1>
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search by city or country..."
          />
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCities.length === 0 ? (
            <div className="col-span-2 text-center text-gray-500 py-12">
              No cities found. Try a different search.
            </div>
          ) : (
            filteredCities.map((city) => (
              <div
                key={city.id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {city.name}
                </h3>
                <p className="text-gray-600 mb-4">{city.country}</p>
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
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
