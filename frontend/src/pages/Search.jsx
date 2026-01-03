/*
 * FILE: pages/Search.jsx
 * PURPOSE: Search and discover cities and activities
 */

import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for search
  const mockCities = [
    {
      id: 1,
      name: 'Paris',
      country: 'France',
      activities: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame'],
      image: '🗼',
      rating: 4.94,
    },
    {
      id: 2,
      name: 'Tokyo',
      country: 'Japan',
      activities: ['Senso-ji Temple', 'Meiji Shrine', 'Shibuya Crossing'],
      image: '🗾',
      rating: 4.89,
    },
    {
      id: 3,
      name: 'New York',
      country: 'USA',
      activities: ['Statue of Liberty', 'Central Park', 'Times Square'],
      image: '🗽',
      rating: 4.85,
    },
    {
      id: 4,
      name: 'Rome',
      country: 'Italy',
      activities: ['Colosseum', 'Vatican City', 'Roman Forum'],
      image: '🏛️',
      rating: 4.92,
    },
    {
      id: 5,
      name: 'Bangkok',
      country: 'Thailand',
      activities: ['Grand Palace', 'Wat Pho', 'Floating Markets'],
      image: '🛕',
      rating: 4.78,
    },
  ];

  const filteredCities = mockCities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      {/* Airbnb-style search bar */}
      <div className="mb-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow">
            <div className="flex-1 px-6 py-4">
              <p className="text-xs font-semibold text-gray-900">Where</p>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-sm text-gray-600 placeholder-gray-400 focus:outline-none bg-transparent"
                placeholder="Search destinations"
              />
            </div>
            <div className="border-l border-gray-300 px-6 py-4 hidden md:block">
              <p className="text-xs font-semibold text-gray-900">When</p>
              <p className="text-sm text-gray-400">Add dates</p>
            </div>
            <div className="border-l border-gray-300 px-6 py-4 hidden md:block">
              <p className="text-xs font-semibold text-gray-900">Who</p>
              <p className="text-sm text-gray-400">Add guests</p>
            </div>
            <button className="bg-[#FF385C] text-white p-4 rounded-full mr-2 hover:bg-[#E31C5F] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Popular destinations</h2>
        <span className="text-gray-400">→</span>
      </div>

      {/* Results Grid - Airbnb style */}
      {filteredCities.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          No cities found. Try a different search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredCities.map((city) => (
            <div key={city.id} className="group cursor-pointer">
              {/* Image */}
              <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">{city.image}</span>
                </div>
                {/* Guest favorite badge */}
                <div className="absolute top-3 left-3 bg-white px-2.5 py-1 rounded-full text-xs font-semibold text-gray-900 shadow-sm">
                  Guest favorite
                </div>
                {/* Heart icon */}
                <button className="absolute top-3 right-3 p-1.5 hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </button>
              </div>
              
              {/* Content */}
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900 text-[15px]">{city.name}</h3>
                  <div className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm text-gray-900">{city.rating}</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">{city.country}</p>
                <p className="text-gray-400 text-sm mt-1">{city.activities.length} popular activities</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
