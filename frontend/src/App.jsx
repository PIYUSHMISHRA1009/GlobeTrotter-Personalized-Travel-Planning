import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateTrip from './pages/CreateTrip';
import TripDetails from './pages/TripDetails';
import AddCity from './pages/AddCity';
import AddActivity from './pages/AddActivity';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Community from './pages/Community';
import Calendar from './pages/Calendar';
import './App.css';

function ProtectedRoute({ children }) {
  const { token, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

function AppRoutes() {
  const { token, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <Routes>
      {/* Public routes */}
      {!token ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <>
          {/* Protected routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-trip" element={<CreateTrip />} />
          <Route path="/trip/:tripId" element={<TripDetails />} />
          <Route path="/trip/:tripId/add-city" element={<AddCity />} />
          <Route path="/city/:cityId/add-activity" element={<AddActivity />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/community" element={<Community />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      )}
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
