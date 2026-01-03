# GlobeTrotter Backend – Copilot Master Prompt

You are GitHub Copilot acting as a senior MERN backend engineer.

PROJECT:
GlobeTrotter – Personalized Travel Planning App

MODE:
Hackathon mode  
Speed > perfection  
Code must RUN  
Do NOT refactor existing working code

STACK:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- CommonJS (require / module.exports)

HARDCODED CONFIG (DO NOT USE .env):
- Server Port: 5000
- MongoDB URI: mongodb://127.0.0.1:27017/globetrotter
- JWT Secret: globetrotter_secret_key

ARCHITECTURE RULES:
- Follow simple MVC pattern
- One responsibility per file
- Use async/await
- Keep logic readable and minimal
- DO NOT break existing APIs
- ONLY add missing APIs when instructed
- Add a short comment block at the TOP of every file explaining its purpose

FOLDER STRUCTURE (MUST MATCH EXACTLY):
backend/src/
├── server.js
├── app.js
├── config/
│   └── db.js
├── models/
│   ├── User.js
│   ├── Trip.js
│   ├── City.js
│   └── Activity.js
├── routes/
│   ├── auth.routes.js
│   └── trip.routes.js
├── controllers/
│   ├── auth.controller.js
│   └── trip.controller.js
├── middleware/
│   └── auth.middleware.js

DATA MODELS:
User:
- name
- email (unique)
- password (hashed)

Trip:
- title
- description
- user (ObjectId ref User)

City:
- name
- country
- trip (ObjectId ref Trip)

Activity:
- name
- cost
- duration
- city (ObjectId ref City)

AUTH RULES:
- JWT-based authentication
- bcrypt password hashing
- Protect all trip-related routes
- Expect token in header:
  Authorization: Bearer <token>

REQUIRED API ENDPOINTS (COMPLETE LIST):

AUTH:
- POST /api/auth/register
- POST /api/auth/login

TRIPS:
- POST /api/trips              → Create a new trip (protected)
- GET  /api/trips              → Get ALL trips of logged-in user (protected)
- GET  /api/trips/:tripId      → Get single trip with cities & activities (protected)

CITIES:
- POST /api/trips/:tripId/cities   → Add city to a trip (protected)

ACTIVITIES:
- POST /api/cities/:cityId/activities → Add activity to a city (protected)

IMPORTANT:
- DO NOT remove or modify existing routes
- DO NOT refactor controllers unless required for new API
- When adding GET /api/trips:
  - Fetch only trips belonging to req.user.id
  - Sort by createdAt (latest first)
  - Return JSON:
    {
      message: "Trips fetched successfully",
      trips: [...]
    }

FILE GENERATION RULES:
- When I open a file and write a task comment, generate ONLY that file’s code
- Do NOT generate frontend code
- Do NOT generate test files
- Do NOT generate sample data
- Keep changes minimal and safe
