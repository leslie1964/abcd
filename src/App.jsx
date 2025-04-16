import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./screens/Login";
import Signup from "./screens/SignUp";
import ForgotPassword from "./screens/ForgotPassword";
import ForgotSSn from "./screens/ForgotSSn";
import CombinedVerification from "./screens/CombinedVerification";
// import Dashboard from './screens/Dashboard';

const App = () => {
  // Simple authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock authentication functions
  const handleLogin = (credentials) => {
    // In a real app, you would validate credentials with your backend
    console.log("Login attempt with:", credentials);
    setIsAuthenticated(true);
  };

  const handleSignup = (userData) => {
    // In a real app, you would send user data to your backend
    console.log("Signup attempt with:", userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/enroll"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Signup onSignup={handleSignup} />
            )
          }
        />

        {/* Protected routes */}
        <Route path="/forgot" element={<ForgotPassword />} />

        <Route path="/forget" element={<ForgotSSn />} />

        {/* Redirect root to login or dashboard based on auth state */}
        <Route
          path="/"
          element={
            <CombinedVerification/>
          }
        />

        {/* Catch all for unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
