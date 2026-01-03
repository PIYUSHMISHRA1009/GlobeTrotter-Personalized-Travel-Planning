/*
 * FILE: app.js
 * PURPOSE: Express application setup with routes and middleware
 */

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const tripRoutes = require('./routes/trip.routes');

const app = express();

// CORS Middleware - Allow frontend on port 5173
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

module.exports = app;
