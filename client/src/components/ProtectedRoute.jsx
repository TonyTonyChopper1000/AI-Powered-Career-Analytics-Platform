import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

// Regular user protected route
export const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    // You can render a loading spinner here
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!currentUser) {
    // Not logged in, redirect to login
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!currentUser.emailVerified && currentUser.role !== 'admin') {
    // Email not verified for regular users
    return <Navigate to="/email-verification" state={{ email: currentUser.email }} replace />;
  }

  return children;
};

// Admin protected route
export const AdminRoute = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!currentUser) {
    // Not logged in, redirect to login
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (currentUser.role !== 'admin') {
    // Not an admin, redirect to home
    return <Navigate to="/home" replace />;
  }

  return children;
};

// Public route - redirect to appropriate page if already logged in
export const PublicRoute = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext);
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (currentUser) {
    if (currentUser.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    
    if (currentUser.emailVerified) {
      return <Navigate to="/home" replace />;
    }
    
    return <Navigate to="/email-verification" state={{ email: currentUser.email }} replace />;
  }

  return children;
};