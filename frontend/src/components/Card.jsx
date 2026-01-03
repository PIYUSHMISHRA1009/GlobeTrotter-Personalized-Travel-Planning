/*
 * FILE: components/Card.jsx
 * PURPOSE: Reusable card component - Airbnb style
 */

import React from 'react';
import { Link } from 'react-router-dom';

export function Card({ children, className = '', hover = true }) {
  return (
    <div className={`bg-white rounded-xl ${className}`}>
      {children}
    </div>
  );
}

export function CardLink({ to, children, className = '' }) {
  return (
    <Link
      to={to}
      className={`block bg-white rounded-xl group ${className}`}
    >
      {children}
    </Link>
  );
}

export function TripCard({ trip, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="cursor-pointer group"
    >
      {/* Image placeholder with gradient */}
      <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl opacity-50">🗺️</span>
        </div>
        {/* Favorite button */}
        <button className="absolute top-3 right-3 p-2 hover:scale-110 transition-transform">
          <svg className="w-6 h-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </div>
      
      {/* Content */}
      <div>
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-900 text-[15px]">
            {trip.title}
          </h3>
        </div>
        <p className="text-gray-500 text-sm mt-0.5 line-clamp-1">
          {trip.description}
        </p>
        <p className="text-gray-400 text-sm mt-1">
          {new Date(trip.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
    </div>
  );
}

export function CityCard({ city, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {city.name}{city.country && <span className="text-gray-500 font-normal">, {city.country}</span>}
          </h3>
        </div>
        {children}
      </div>
      
      {/* Activities Section */}
      {city.activities && city.activities.length > 0 && (
        <div className="space-y-3">
          {city.activities.map((activity) => (
            <ActivityCard key={activity._id} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
}

export function ActivityCard({ activity }) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center flex-shrink-0">
        <span className="text-lg">📍</span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 text-sm">{activity.name}</h4>
        {activity.duration && (
          <p className="text-xs text-gray-500">{activity.duration}</p>
        )}
      </div>
      {(activity.cost !== undefined && activity.cost > 0) && (
        <span className="text-sm font-semibold text-gray-900">
          ${activity.cost}
        </span>
      )}
    </div>
  );
}

export function EmptyState({ icon = '✨', title, message, action }) {
  return (
    <div className="text-center py-16">
      <div className="text-7xl mb-6">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">{message}</p>
      {action && action}
    </div>
  );
}
