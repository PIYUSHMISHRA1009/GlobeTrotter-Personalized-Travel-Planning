/*
 * FILE: pages/Calendar.jsx
 * PURPOSE: Calendar-based itinerary view with activities
 */

import React, { useState } from 'react';
import Layout from '../components/Layout';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1));

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

  const getDateKey = (day) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Trip calendar</h1>
          <p className="text-gray-500 text-sm mt-1">View your trip schedule and daily activities</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <button 
                onClick={handlePrevMonth}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="text-lg font-semibold text-gray-900">{monthName}</h2>
              <button 
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                <div key={idx} className="text-center text-xs font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((day, idx) => {
                const dateKey = day ? getDateKey(day) : null;
                const hasEvents = dateKey && mockEvents[dateKey];

                return (
                  <div 
                    key={idx} 
                    className={`aspect-square flex flex-col items-center justify-center rounded-full cursor-pointer transition-colors
                      ${day ? 'hover:bg-gray-100' : ''}
                      ${hasEvents ? 'bg-[#FF385C] text-white hover:bg-[#E31C5F]' : ''}
                    `}
                  >
                    {day && (
                      <span className={`text-sm font-medium ${hasEvents ? 'text-white' : 'text-gray-900'}`}>
                        {day}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar - Upcoming Activities */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Upcoming</h3>
            <div className="space-y-6">
              {Object.entries(mockEvents).map(([date, events]) => (
                <div key={date}>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    {new Date(date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                  <div className="space-y-3">
                    {events.map((event, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-lg bg-rose-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm">📍</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {event.activity}
                          </p>
                          <p className="text-xs text-gray-500">{event.time}</p>
                        </div>
                        {event.cost > 0 && (
                          <span className="text-sm font-semibold text-gray-900">
                            ${event.cost}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
