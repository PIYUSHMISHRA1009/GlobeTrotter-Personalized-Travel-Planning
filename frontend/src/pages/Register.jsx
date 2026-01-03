/*
 * FILE: pages/Register.jsx
 * PURPOSE: User registration screen for creating new accounts
 */

import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../utils/api';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.register(name, email, password);
      const { token, user } = response.data;
      login(user, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-[568px] px-6">
        {/* Modal Card */}
        <div className="border border-gray-200 rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200 p-6 text-center">
            <h1 className="text-lg font-semibold text-gray-900">Finish signing up</h1>
          </div>

          {/* Content */}
          <div className="p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister}>
              <div className="space-y-3 mb-4">
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-base peer"
                    placeholder=" "
                    required
                  />
                  <label className="absolute text-gray-500 text-sm left-4 top-2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm transition-all">
                    Full name
                  </label>
                </div>

                <p className="text-xs text-gray-500 px-1">
                  Make sure it matches the name on your government ID.
                </p>

                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-base peer"
                    placeholder=" "
                    required
                  />
                  <label className="absolute text-gray-500 text-sm left-4 top-2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm transition-all">
                    Email
                  </label>
                </div>

                <p className="text-xs text-gray-500 px-1">
                  We'll email you trip confirmations and receipts.
                </p>

                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 pt-6 pb-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-base peer"
                    placeholder=" "
                    required
                  />
                  <label className="absolute text-gray-500 text-sm left-4 top-2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm transition-all">
                    Password
                  </label>
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-4">
                By selecting <strong>Agree and continue</strong>, I agree to GlobeTrotter's Terms of Service and Privacy Policy.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF385C] text-white font-medium py-3.5 rounded-xl hover:bg-[#E31C5F] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-base"
              >
                {loading ? 'Creating account...' : 'Agree and continue'}
              </button>
            </form>

            <div className="flex items-center my-5">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-xs text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <Link
              to="/login"
              className="block w-full py-3.5 px-4 border border-gray-900 rounded-xl text-center font-medium text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Already have an account? Log in
            </Link>
          </div>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center mt-8 gap-2">
          <svg viewBox="0 0 32 32" className="h-8 w-8 text-[#FF385C]" fill="currentColor">
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415.001.228c0 4.062-2.877 6.478-6.357 6.478-2.224 0-4.556-1.258-6.709-3.386l-.257-.26-.172-.179h-.054l-.1.092c-2.146 2.09-4.398 3.733-6.639 3.733-3.48 0-6.357-2.416-6.357-6.478 0-1.357.333-2.614 1.116-4.392l.109-.246c.96-2.176 5.096-10.742 7.1-14.836l.533-1.025C10.537 1.963 11.992 1 14 1h2zm0 2h-2c-.82 0-1.6.39-2.697 2.156l-.393.698c-1.89 3.701-5.936 12.068-6.9 14.308l-.137.31c-.702 1.585-.885 2.376-.885 3.506 0 2.643 1.744 4.022 3.857 4.022 1.527 0 3.283-1.027 5.15-2.89l.584-.592.569.576c1.855 1.857 3.556 2.906 5.086 2.906 2.113 0 3.857-1.379 3.857-4.022 0-1.13-.183-1.921-.885-3.506l-.137-.31c-.964-2.24-5.01-10.607-6.9-14.308l-.393-.698C17.6 3.39 16.82 3 16 3z"/>
          </svg>
          <span className="text-[#FF385C] font-semibold text-lg">GlobeTrotter</span>
        </div>
      </div>
    </div>
  );
}
