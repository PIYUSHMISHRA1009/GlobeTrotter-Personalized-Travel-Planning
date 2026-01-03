/*
 * FILE: pages/Calendar.jsx
 * PURPOSE: Calendar-based itinerary view with activities
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1));

  // Mock itinerary data
  const mockEvents = {
    '2024-01-15': [
      { activity: 'Arrive in Paris', time: '14:00', cost: 0 },
      { activity: 'Check-in at hotel', time: '16:00', cost: 0 },
    ],
    '2024-01-16': [
      { activity: 'Eiffel Tower Tour', time: '09:00', cost: 25 },
      { activity: 'Louvre Museum', time: '14:00', cost: 20 },
    ],
    '2024-01-17': [
      { activity: 'Seine River Cruise', time: '10:00', cost: 30 },
      { activity: 'Notre-Dame Visit', time: '16:00', cost: 15 },
    ],
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthName = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Trip Calendar</h1>
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={handlePrevMonth}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                ← Previous
              </button>
              <h2 className="text-xl font-bold text-gray-800">{monthName}</h2>
              <button
                onClick={handleNextMonth}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Next →
              </button>
            </div>

            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="text-center font-semibold text-gray-600 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, idx) => {
                const dateStr = day
                  ? `2024-01-${String(day).padStart(2, '0')}`
                  : '';
                const hasEvents = dateStr && mockEvents[dateStr];

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded border-2 min-h-24 ${
                      day === null
                        ? 'bg-gray-50 border-gray-100'
                        : hasEvents
                        ? 'bg-blue-50 border-blue-300 cursor-pointer hover:bg-blue-100'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {day && (
                      <>
                        <p className="font-semibold text-gray-800">{day}</p>
                        {hasEvents && (
                          <div className="mt-2 space-y-1">
                            {mockEvents[dateStr].slice(0, 2).map((event, i) => (
                              <p
                                key={i}
                                className="text-xs text-blue-600 truncate"
                              >
                                {event.activity}
                              </p>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Events Sidebar */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Upcoming Events
            </h3>
            <div className="space-y-4">
              {Object.entries(mockEvents).map(([date, events]) => (
                <div key={date} className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold text-gray-700 mb-2">
                    {new Date(date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                  <ul className="space-y-2">
                    {events.map((event, idx) => (
                      <li key={idx} className="text-sm">
                        <p className="text-gray-700">{event.activity}</p>
                        <p className="text-gray-500 text-xs">
                          {event.time} • ${event.cost}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
