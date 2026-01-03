┌──────────────────────────────────────────────────────────────┐
│                GlobeTrotter Frontend Design                   │
│                  ALL SCREENS MANDATORY                        │
│                     Hackathon MVP                             │
└──────────────────────────────────────────────────────────────┘

This document defines ALL frontend screens, user flow, and API
mapping for the GlobeTrotter – Personalized Travel Planning App.

All 12 screens listed below are MANDATORY and should be implemented
(at least in basic functional form) for the hackathon demo.

────────────────────────────────────────────────────────────────

TECH STACK
──────────
• React (Vite)
• JavaScript (ES6)
• React Router DOM
• Axios
• Tailwind CSS
• JWT Authentication

Backend Base URL:
http://localhost:5000

JWT Handling:
• Token stored in localStorage
• Sent as:
  Authorization: Bearer <token>

────────────────────────────────────────────────────────────────

TOTAL SCREENS: 12 (ALL REQUIRED)
────────────────────────────────

1. LOGIN SCREEN
──────────────
Purpose:
• Authenticate existing users

UI Elements:
• App logo / title
• Email input
• Password input
• Login button
• Link to Register

React Page:
• pages/Login.jsx

API:
• POST /api/auth/login

────────────────────────────────────────────────────────────────

2. REGISTRATION SCREEN
─────────────────────
Purpose:
• Create a new user account

UI Elements:
• Name
• Email
• Password
• Register button
• Link to Login

React Page:
• pages/Register.jsx

API:
• POST /api/auth/register

────────────────────────────────────────────────────────────────

3. DASHBOARD / LANDING PAGE
──────────────────────────
Purpose:
• Central hub after login
• Entry point for trip planning

UI Elements:
• Welcome message
• Trip cards
• “Create New Trip” button

React Page:
• pages/Dashboard.jsx

API:
• GET /api/trips

────────────────────────────────────────────────────────────────

4. CREATE NEW TRIP
─────────────────
Purpose:
• Create a new travel plan

UI Elements:
• Trip title
• Trip description
• Create button

React Page:
• pages/CreateTrip.jsx

API:
• POST /api/trips

────────────────────────────────────────────────────────────────

5. TRIP DETAILS / ITINERARY BUILDER
──────────────────────────────────
Purpose:
• Build and view itinerary for a trip

UI Elements:
• Trip title & description
• List of cities
• Activities under each city
• Add City button
• Add Activity button

React Page:
• pages/TripDetails.jsx

APIs:
• GET  /api/trips/:tripId
• POST /api/trips/:tripId/cities
• POST /api/cities/:cityId/activities

────────────────────────────────────────────────────────────────

6. USER TRIP LISTING
───────────────────
Purpose:
• View all trips created by the user

UI Elements:
• Trip cards
• Trip status (ongoing / completed)

React Page:
• pages/Dashboard.jsx

API:
• GET /api/trips

────────────────────────────────────────────────────────────────

7. ADD CITY TO TRIP
──────────────────
Purpose:
• Add a city to an existing trip

UI Elements:
• City name
• Country
• Add button

React Page:
• pages/AddCity.jsx

API:
• POST /api/trips/:tripId/cities

────────────────────────────────────────────────────────────────

8. USER PROFILE SCREEN
─────────────────────
Purpose:
• View user profile and travel history

UI Elements:
• User details
• Previous trips
• Profile summary

React Page:
• pages/Profile.jsx

API:
• Can reuse GET /api/trips
• User info from token (or mock)

────────────────────────────────────────────────────────────────

9. SEARCH CITIES / ACTIVITIES
────────────────────────────
Purpose:
• Discover cities and activities

UI Elements:
• Search bar
• Filters
• Results list

React Page:
• pages/Search.jsx

API:
• Static / mocked data acceptable
• Can later integrate external APIs

────────────────────────────────────────────────────────────────

10. ITINERARY VIEW WITH BUDGET
─────────────────────────────
Purpose:
• Show complete itinerary with cost breakdown

UI Elements:
• Day-wise plan
• Activities
• Budget per activity
• Total trip cost

React Page:
• pages/TripDetails.jsx

API:
• GET /api/trips/:tripId

────────────────────────────────────────────────────────────────

11. COMMUNITY TRIPS
──────────────────
Purpose:
• Explore trips shared by other users

UI Elements:
• Trip feed
• Search and filter
• Trip preview cards

React Page:
• pages/Community.jsx

API:
• Mock data acceptable for hackathon

────────────────────────────────────────────────────────────────

12. CALENDAR VIEW
────────────────
Purpose:
• Visual calendar-based itinerary view

UI Elements:
• Calendar layout
• Activities mapped to dates

React Page:
• pages/Calendar.jsx

API:
• GET /api/trips/:tripId
• UI-based visualization

────────────────────────────────────────────────────────────────

FINAL CONFIRMATION
──────────────────
✔ Total Screens: 12  
✔ All screens are mandatory  
✔ Backend APIs already sufficient  
✔ Frontend can be built incrementally  
✔ Hackathon demo ready

────────────────────────────────────────────────────────────────

COPILOT NOTES
─────────────
• Generate one file at a time
• Keep UI functional, not fancy
• Minimal styling is fine
• Mock data is acceptable where backend is not critical
• Focus on navigation + flow

└──────────────────────────────────────────────────────────────┘
