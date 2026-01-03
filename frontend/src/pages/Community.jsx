/*
 * FILE: pages/Community.jsx
 * PURPOSE: View and explore trips shared by other users (mock data)
 */

import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function Community() {
  // Mock community trips data
  const [communityTrips] = useState([
    {
      id: 1,
      title: 'Summer in Europe',
      description: 'A 3-week adventure across 5 European countries',
      author: 'John Doe',
      authorInitial: 'J',
      cities: ['Paris', 'Rome', 'Barcelona', 'Amsterdam', 'Berlin'],
      likes: 234,
      image: '🇪🇺',
      rating: 4.97,
    },
    {
      id: 2,
      title: 'Asian Wonders',
      description: 'Explore the mystical lands of Asia',
      author: 'Jane Smith',
      authorInitial: 'J',
      cities: ['Tokyo', 'Bangkok', 'Bali', 'Singapore', 'Seoul'],
      likes: 456,
      image: '🌏',
      rating: 4.92,
    },
    {
      id: 3,
      title: 'Caribbean Paradise',
      description: 'Beach hopping in the Caribbean islands',
      author: 'Mike Johnson',
      authorInitial: 'M',
      cities: ['Jamaica', 'Bahamas', 'Dominican Republic', 'Turks & Caicos'],
      likes: 189,
      image: '🏝️',
      rating: 4.88,
    },
    {
      id: 4,
      title: 'Backpacking South America',
      description: 'Budget-friendly adventure in South America',
      author: 'Sarah Williams',
      authorInitial: 'S',
      cities: ['Lima', 'Cusco', 'La Paz', 'Rio de Janeiro'],
      likes: 312,
      image: '🌎',
      rating: 4.85,
    },
    {
      id: 5,
      title: 'Middle East Explorer',
      description: 'Discover the ancient and modern Middle East',
      author: 'Ahmed Hassan',
      authorInitial: 'A',
      cities: ['Dubai', 'Amman', 'Istanbul', 'Cairo'],
      likes: 278,
      image: '🕌',
      rating: 4.94,
    },
    {
      id: 6,
      title: 'African Safari',
      description: 'Wildlife adventure across Africa',
      author: 'Emma Brown',
      authorInitial: 'E',
      cities: ['Kenya', 'Tanzania', 'Botswana', 'South Africa'],
      likes: 401,
      image: '🦁',
      rating: 4.99,
    },
  ]);

  return (
    <Layout>
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-semibold text-gray-900">GlobeTrotter Originals</h1>
          <span className="text-gray-400">→</span>
        </div>
        <p className="text-gray-500 text-sm">Created by the world's most adventurous travelers</p>
      </div>

      {/* Community Trips Grid - Airbnb style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {communityTrips.map((trip) => (
          <div key={trip.id} className="group cursor-pointer">
            {/* Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-gradient-to-br from-rose-100 via-orange-50 to-amber-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl">{trip.image}</span>
              </div>
              {/* Original badge */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-gray-900 flex items-center gap-1.5">
                <span className="text-green-500">✎</span>
                Original
              </div>
              {/* Heart icon */}
              <button className="absolute top-3 right-3 p-1.5 hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
              {/* Author avatar */}
              <div className="absolute bottom-3 left-3 w-10 h-10 rounded-full bg-gray-700 border-2 border-white flex items-center justify-center">
                <span className="text-white font-medium text-sm">{trip.authorInitial}</span>
              </div>
            </div>
            
            {/* Content */}
            <div>
              <h3 className="font-semibold text-gray-900 text-[15px] line-clamp-2 leading-tight">
                {trip.title}
              </h3>
              <p className="text-gray-500 text-sm mt-1">{trip.author}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-sm text-gray-900">From</span>
                <span className="text-sm font-semibold text-gray-900">{trip.cities.length} cities</span>
                <span className="text-gray-400">·</span>
                <svg className="w-3.5 h-3.5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm text-gray-900">{trip.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Second Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Popular with travelers from your area</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Europe', 'Asia', 'Americas', 'Africa'].map((region) => (
            <div key={region} className="group cursor-pointer">
              <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 mb-2 flex items-center justify-center group-hover:shadow-lg transition-shadow">
                <span className="text-4xl opacity-60">🌍</span>
              </div>
              <h3 className="font-medium text-gray-900 text-sm">{region} trips</h3>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
