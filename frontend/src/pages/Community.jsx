/*
 * FILE: pages/Community.jsx
 * PURPOSE: View and explore trips shared by other users (mock data)
 */

import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card } from '../components/Card';

export default function Community() {
  // Mock community trips data
  const [communityTrips] = useState([
    {
      id: 1,
      title: 'Summer in Europe',
      description: 'A 3-week adventure across 5 European countries',
      author: 'John Doe',
      cities: ['Paris', 'Rome', 'Barcelona', 'Amsterdam', 'Berlin'],
      likes: 234,
    },
    {
      id: 2,
      title: 'Asian Wonders',
      description: 'Explore the mystical lands of Asia',
      author: 'Jane Smith',
      cities: ['Tokyo', 'Bangkok', 'Bali', 'Singapore', 'Seoul'],
      likes: 456,
    },
    {
      id: 3,
      title: 'Caribbean Paradise',
      description: 'Beach hopping in the Caribbean islands',
      author: 'Mike Johnson',
      cities: ['Jamaica', 'Bahamas', 'Dominican Republic', 'Turks & Caicos'],
      likes: 189,
    },
    {
      id: 4,
      title: 'Backpacking South America',
      description: 'Budget-friendly adventure in South America',
      author: 'Sarah Williams',
      cities: ['Lima', 'Cusco', 'La Paz', 'Rio de Janeiro'],
      likes: 312,
    },
    {
      id: 5,
      title: 'Middle East Explorer',
      description: 'Discover the ancient and modern Middle East',
      author: 'Ahmed Hassan',
      cities: ['Dubai', 'Amman', 'Istanbul', 'Cairo'],
      likes: 278,
    },
    {
      id: 6,
      title: 'African Safari',
      description: 'Wildlife adventure across Africa',
      author: 'Emma Brown',
      cities: ['Kenya', 'Tanzania', 'Botswana', 'South Africa'],
      likes: 401,
    },
  ]);

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Trips</h1>
        <p className="text-gray-500 mb-8">Get inspired by trips shared by fellow travelers</p>

        {/* Community Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communityTrips.map((trip) => (
            <Card key={trip.id} className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {trip.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {trip.description}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                by <span className="font-semibold text-gray-700">{trip.author}</span>
              </p>
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  Cities:
                </p>
                <div className="flex flex-wrap gap-2">
                  {trip.cities.slice(0, 3).map((city, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                    >
                      {city}
                    </span>
                  ))}
                  {trip.cities.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      +{trip.cities.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center text-gray-500">
                  <span className="text-lg mr-1">❤️</span>
                  <span className="text-sm font-medium">{trip.likes}</span>
                </div>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                  View Trip →
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
