/*
 * FILE: components/Card.jsx
 * PURPOSE: Reusable card component for consistent card-based UI
 * DESIGN: Inspired by Airbnb/Booking.com card patterns
 */

import React from 'react';
import { Link } from 'react-router-dom';

export function Card({ children, className = '', hover = true }) {
  const hoverClass = hover ? 'hover:shadow-lg transition-shadow duration-200' : '';
  return (
    <div className={`bg-white rounded-lg shadow ${hoverClass} ${className}`}>
      {children}
    </div>
  );
}

export function CardLink({ to, children, className = '' }) {
  return (
    <Link
      to={to}
      className={`block bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 ${className}`}
    >
      {children}
    </Link>
  );
}

export function TripCard({ trip, onClick }) {
  return (
    <Card hover className="p-6 cursor-pointer" onClick={onClick}>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {trip.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {trip.description}
      </p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Created {new Date(trip.createdAt).toLocaleDateString()}</span>
        <span className="text-blue-600 font-medium">View Details →</span>
      </div>
    </Card>
  );
}

export function CityCard({ city, children }) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {city.name}{city.country && `, ${city.country}`}
          </h3>
          {city.duration && (
            <p className="text-sm text-gray-500 mt-1">
              Duration: {city.duration} days
            </p>
          )}
        </div>
        {children}
      </div>
      {city.description && (
        <p className="text-gray-600 text-sm mb-4">{city.description}</p>
      )}
      
      {/* Activities Section */}
      {city.activities && city.activities.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Activities</h4>
          <div className="space-y-2">
            {city.activities.map((activity) => (
              <ActivityCard key={activity._id} activity={activity} />
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

export function ActivityCard({ activity }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-medium text-gray-800">{activity.name}</h4>
          {activity.description && (
            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
          )}
          {activity.duration && (
            <p className="text-xs text-gray-500 mt-1">Duration: {activity.duration}</p>
          )}
        </div>
        {(activity.cost !== undefined && activity.cost > 0) && (
          <span className="ml-4 text-blue-600 font-semibold">
            ${activity.cost}
          </span>
        )}
      </div>
    </div>
  );
}

export function EmptyState({ icon = '✨', title, message, action }) {
  return (
    <Card className="p-12 text-center">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{message}</p>
      {action && action}
    </Card>
  );
}
