You are an expert Node.js backend engineer.

PROJECT NAME:
GlobeTrotter – Personalized Travel Planning App

STACK:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt for password hashing
- CommonJS syntax (require / module.exports)

GOAL:
Generate a COMPLETE, WORKING backend for a MERN application.

ARCHITECTURE RULES:
- Follow MVC pattern
- One responsibility per file
- Clean, readable, hackathon-ready code
- Use async/await
- Add a clear comment block at the TOP of EVERY file explaining:
  - File name
  - Purpose
  - What it exports

FOLDER STRUCTURE:
backend/src/
├── server.js              → Entry point, starts server
├── app.js                 → Express app setup
├── config/
│   └── db.js              → MongoDB connection logic
├── models/
│   ├── User.js            → User schema (auth)
│   ├── Trip.js            → Trip schema
│   ├── City.js            → City schema
│   └── Activity.js        → Activity schema
├── routes/
│   ├── auth.routes.js     → Auth routes
│   └── trip.routes.js     → Trip, City, Activity routes
├── controllers/
│   ├── auth.controller.js
│   └── trip.controller.js
├── middleware/
│   └── auth.middleware.js → JWT protection middleware

DATA MODEL RULES:
- User:
  - name
  - email (unique)
  - password (hashed)
- Trip:
  - title
  - description
  - user (ObjectId ref User)
- City:
  - name
  - country
  - trip (ObjectId ref Trip)
- Activity:
  - name
  - cost
  - duration
  - city (ObjectId ref City)

AUTH RULES:
- Signup & login using JWT
- Password hashing using bcrypt
- Protect all trip routes
- Use Authorization: Bearer <token>

API ENDPOINTS:
- POST /api/auth/register
- POST /api/auth/login
- POST /api/trips
- POST /api/trips/:tripId/cities
- POST /api/cities/:cityId/activities
- GET /api/trips/:tripId

IMPORTANT:
- Do NOT generate frontend code
- Do NOT generate fake data
- Code must RUN without modification
