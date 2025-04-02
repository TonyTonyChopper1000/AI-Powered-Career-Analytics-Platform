import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiMail, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { resendVerificationEmail, auth } from "../firebase"
import { toast } from 'react-toastify';

const EmailVerificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';
  
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate('/');
      return;
    }

    // Check verification status periodically
    const checkVerification = setInterval(() => {
      if (auth.currentUser) {
        auth.currentUser.reload().then(() => {
          if (auth.currentUser.emailVerified) {
            setVerified(true);
            clearInterval(checkVerification);
          }
        });
      }
    }, 3000);

    return () => clearInterval(checkVerification);
  }, [email, navigate]);

  // Handle redirect after verification
  useEffect(() => {
    if (verified) {
      toast.success("Email verified successfully!");
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    }
  }, [verified, navigate]);

  // Countdown timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const handleResendEmail = async () => {
    setLoading(true);
    try {
      const result = await resendVerificationEmail();
      if (result.success) {
        toast.success("Verification email sent successfully!");
        setTimer(60);
        setIsTimerRunning(true);
      } else {
        toast.error(result.error || "Failed to send verification email");
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-600 relative overflow-hidden">
        <img 
          src="/images/verification-bg.jpg" 
          alt="Email verification background" 
          className="object-cover w-full h-full opacity-80"
        />
        <div className="absolute inset-0 bg-indigo-900 opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
          <h1 className="text-4xl font-bold mb-4">Almost There!</h1>
          <p className="text-lg text-indigo-100">Please verify your email to continue.</p>
        </div>
      </div>

      {/* Right side - Verification info */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8 py-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Back button */}
          <button 
            type="button" 
            onClick={handleBackToLogin}
            className="mb-8 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
          >
            <FiArrowLeft className="mr-2" /> Back to login
          </button>

          {/* Logo/Brand */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
              <FiMail className="h-8 w-8 text-indigo-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Verify Your Email</h2>
            <p className="mt-2 text-gray-600">
              We've sent a verification link to <span className="font-medium">{email}</span>
            </p>
          </div>

          {verified ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <FiCheck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Email Verified Successfully!</h3>
              <p className="mt-2 text-gray-600">Redirecting you to the dashboard...</p>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Please check your inbox</h3>
              <p className="text-gray-600 mb-6">
                Click on the verification link in the email we sent to complete your registration.
                If you don't see it, check your spam folder.
              </p>
              
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 mb-4">
                  Didn't receive the email?
                </p>
                
                {isTimerRunning ? (
                  <p className="text-sm text-gray-600">
                    You can resend in <span className="font-medium text-indigo-600">{timer} seconds</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendEmail}
                    disabled={loading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white transition-colors duration-200 ${
                      loading
                        ? 'bg-indigo-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    }`}
                  >
                    {loading ? 'Sending...' : 'Resend Verification Email'}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Help text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Having trouble? <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;