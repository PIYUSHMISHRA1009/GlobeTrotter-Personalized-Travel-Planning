/*
 * FILE: components/Layout.jsx
 * PURPOSE: Global layout wrapper with Airbnb-style navbar
 */

import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-white">
      {/* Airbnb-style Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-[1760px] mx-auto px-6 md:px-10 lg:px-20">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center">
              <svg viewBox="0 0 32 32" className="h-8 w-8 text-[#FF385C]" fill="currentColor">
                <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415.001.228c0 4.062-2.877 6.478-6.357 6.478-2.224 0-4.556-1.258-6.709-3.386l-.257-.26-.172-.179h-.054l-.1.092c-2.146 2.09-4.398 3.733-6.639 3.733-3.48 0-6.357-2.416-6.357-6.478 0-1.357.333-2.614 1.116-4.392l.109-.246c.96-2.176 5.096-10.742 7.1-14.836l.533-1.025C10.537 1.963 11.992 1 14 1h2zm0 2h-2c-.82 0-1.6.39-2.697 2.156l-.393.698c-1.89 3.701-5.936 12.068-6.9 14.308l-.137.31c-.702 1.585-.885 2.376-.885 3.506 0 2.643 1.744 4.022 3.857 4.022 1.527 0 3.283-1.027 5.15-2.89l.584-.592.569.576c1.855 1.857 3.556 2.906 5.086 2.906 2.113 0 3.857-1.379 3.857-4.022 0-1.13-.183-1.921-.885-3.506l-.137-.31c-.964-2.24-5.01-10.607-6.9-14.308l-.393-.698C17.6 3.39 16.82 3 16 3z"/>
              </svg>
              <span className="ml-1 text-[#FF385C] text-xl font-bold hidden md:block">GlobeTrotter</span>
            </Link>

            {/* Center Navigation Tabs */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center gap-1 bg-white rounded-full border border-gray-200 p-1">
                <Link
                  to="/dashboard"
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    isActive('/dashboard')
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  My Trips
                </Link>
                <Link
                  to="/search"
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    isActive('/search')
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  Explore
                </Link>
                <Link
                  to="/community"
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    isActive('/community')
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  Community
                </Link>
                <Link
                  to="/calendar"
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    isActive('/calendar')
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  Calendar
                </Link>
              </div>
            </div>

            {/* Right Side - User Menu */}
            <div className="flex items-center gap-4">
              <Link
                to="/create-trip"
                className="hidden md:block text-sm font-medium text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full transition"
              >
                Plan a trip
              </Link>
              
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 border border-gray-300 rounded-full py-1.5 px-2 hover:shadow-md transition-shadow"
                >
                  <svg viewBox="0 0 32 32" className="h-4 w-4 text-gray-600 ml-1">
                    <path fill="currentColor" d="M4 7h24v2H4zm0 8h24v2H4zm0 8h24v2H4z"/>
                  </svg>
                  <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 font-medium"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Trips
                    </Link>
                    <Link
                      to="/create-trip"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Plan a Trip
                    </Link>
                    <hr className="my-2 border-gray-200" />
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-100">
          <div className="flex justify-around py-2">
            <Link
              to="/dashboard"
              className={`flex flex-col items-center px-4 py-2 text-xs ${
                isActive('/dashboard') ? 'text-[#FF385C]' : 'text-gray-500'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Trips
            </Link>
            <Link
              to="/search"
              className={`flex flex-col items-center px-4 py-2 text-xs ${
                isActive('/search') ? 'text-[#FF385C]' : 'text-gray-500'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Explore
            </Link>
            <Link
              to="/community"
              className={`flex flex-col items-center px-4 py-2 text-xs ${
                isActive('/community') ? 'text-[#FF385C]' : 'text-gray-500'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Community
            </Link>
            <Link
              to="/profile"
              className={`flex flex-col items-center px-4 py-2 text-xs ${
                isActive('/profile') ? 'text-[#FF385C]' : 'text-gray-500'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </Link>
          </div>
        </div>
      </nav>

      {/* Click outside to close menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}

      {/* Main Content */}
      <main className="max-w-[1760px] mx-auto px-6 md:px-10 lg:px-20 py-8">
        {children}
      </main>
    </div>
  );
}
