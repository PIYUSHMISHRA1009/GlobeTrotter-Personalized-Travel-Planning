/*
 * FILE: pages/Calendar.jsx
 * PURPOSE: Calendar-based itinerary view with activities
 */

import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

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
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Trip Calendar</h1>
        <p className="text-gray-500 mb-8">View your trip schedule and daily activities</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <Button onClick={handlePrevMonth} variant="secondary" size="sm">
                  ← Previous
                </Button>
                <h2 className="text-xl font-bold text-gray-800">{monthName}</h2>
                <Button onClick={handleNextMonth} variant="secondary" size="sm">
                  Next →
                </Button>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {days.map((day, idx) => {
                  const dateKey = day ? getDateKey(day) : null;
                  const hasEvents = dateKey && mockEvents[dateKey];
                  const baseClasses = 'aspect-square p-2 rounded-lg text-center';
                  const dayClasses = day
                    ? hasEvents
                      ? 'bg-blue-50 border-2 border-blue-200 cursor-pointer hover:bg-blue-100'
                      : 'bg-white border border-gray-200 hover:bg-gray-50'
                    : '';

                  return (
                    <div key={idx} className={`${baseClasses} ${dayClasses}`}>
                      {day && (
                        <>
                          <div className="text-sm font-medium text-gray-800">{day}</div>
                          {hasEvents && (
                            <div className="text-xs text-blue-600 mt-1">
                              • {mockEvents[dateKey].length}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Activities</h3>
              <div className="space-y-4">
                {Object.entries(mockEvents).map(([date, events]) => (
                  <div key={date}>
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      {new Date(date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <div className="space-y-2">
                      {events.map((event, idx) => (
                        <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                {event.activity}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">{event.time}</p>
                            </div>
                            {event.cost > 0 && (
                              <span className="text-sm font-semibold text-blue-600">
                                ${event.cost}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
