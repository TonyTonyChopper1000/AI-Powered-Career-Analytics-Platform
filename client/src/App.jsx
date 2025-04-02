import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Auth Context Provider
import { AuthProvider } from './contexts/AuthContext';

// Route Protection Components
import { ProtectedRoute, AdminRoute, PublicRoute } from './components/ProtectedRoute';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EmailVerificationPage from './pages/EmailVerificationPage';
import LandingPage from './pages/LandingPage';
import UserProfile from './pages/UserProfile';
import AdminDashboard from './pages/AdminDashboard';
import UserFeedback from './pages/UserFeedbackPage';
import MentorMatchingPage from './pages/MentorMatchingPage';
import SalaryPredictionPage from './pages/SalaryPredictionPage';

// Firestore initialization
import { initializeFirestore } from './utils/initializeFirestore';
import { auth } from './firebase';

const App = () => {
  // Initialize Firestore with sample data on app load
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Only initialize if user is authenticated
        const user = auth.currentUser;
        if (user) {
          await initializeFirestore(user.uid);
        }
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };
    
    initializeData();
  }, []);
  
  return (
    <Router>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={5000} />
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            } 
          />
          <Route path="/email-verification" element={<EmailVerificationPage />} />
          
          {/* Protected Routes for Regular Users */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <LandingPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/userprofile" 
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/feedback" 
            element={
              <ProtectedRoute>
                <UserFeedback />
              </ProtectedRoute>
            } 
          />
          
          {/* Mentor Matching Route */}
          <Route 
            path="/mentors" 
            element={
              <ProtectedRoute>
                <MentorMatchingPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Salary Prediction Route */}
          <Route 
            path="/salary-prediction" 
            element={
              <ProtectedRoute>
                <SalaryPredictionPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
          
          {/* Catch-all/404 route */}
          <Route 
            path="*" 
            element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-lg text-gray-600 mb-6">Page not found</p>
                  <a 
                    href="/"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Go back home
                  </a>
                </div>
              </div>
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;