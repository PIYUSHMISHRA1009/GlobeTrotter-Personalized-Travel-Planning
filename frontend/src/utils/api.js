/*
 * FILE: utils/api.js
 * PURPOSE: Axios configuration and API call wrappers with JWT authentication
 */

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth APIs
export const authAPI = {
  register: (name, email, password) =>
    api.post('/api/auth/register', { name, email, password }),
  login: (email, password) =>
    api.post('/api/auth/login', { email, password }),
};

// Trip APIs
export const tripAPI = {
  getAllTrips: () => api.get('/api/trips'),
  createTrip: (title, description) =>
    api.post('/api/trips', { title, description }),
  getTripDetails: (tripId) => api.get(`/api/trips/${tripId}`),
  addCity: (tripId, name, country) =>
    api.post(`/api/trips/${tripId}/cities`, { name, country }),
  addActivity: (cityId, name, cost, duration) =>
    api.post(`/api/cities/${cityId}/activities`, { name, cost, duration }),
};

export default api;
