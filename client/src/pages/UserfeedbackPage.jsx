import React, { useState, useEffect } from 'react';
import { 
  FiStar, 
  FiSmile, 
  FiMeh, 
  FiFrown, 
  FiSend,
  FiCheckCircle,
} from 'react-icons/fi';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';

const UserFeedback = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [feedbackType, setFeedbackType] = useState('');
  const [satisfaction, setSatisfaction] = useState(null);
  const [ratings, setRatings] = useState({
    usability: 0,
    features: 0,
    recommendations: 0,
    support: 0,
    overall: 0
  });
  const [feedbackText, setFeedbackText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [contactPermission, setContactPermission] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get current user on component mount
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setCurrentUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      });
    }
  }, []);

  const feedbackTypes = [
    { id: 'general', label: 'General Feedback' },
    { id: 'feature', label: 'Feature Request' },
    { id: 'bug', label: 'Report an Issue' },
    { id: 'mentor', label: 'Mentor Feedback' },
    { id: 'course', label: 'Course Feedback' }
  ];

  const satisfactionEmojis = [
    { id: 'dissatisfied', icon: <FiFrown className="w-8 h-8" />, label: 'Dissatisfied' },
    { id: 'neutral', icon: <FiMeh className="w-8 h-8" />, label: 'Neutral' },
    { id: 'satisfied', icon: <FiSmile className="w-8 h-8" />, label: 'Satisfied' }
  ];

  const handleRatingChange = (category, value) => {
    setRatings(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!feedbackType) {
      newErrors.feedbackType = 'Please select a feedback type';
    }
    
    if (satisfaction === null) {
      newErrors.satisfaction = 'Please select your satisfaction level';
    }
    
    if (feedbackText.trim().length < 10) {
      newErrors.feedbackText = 'Please provide more details (minimum 10 characters)';
    }
    
    if (ratings.overall === 0) {
      newErrors.overallRating = 'Please provide an overall rating';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      
      try {
        // Prepare feedback data
        const feedbackData = {
          feedbackType,
          satisfaction,
          ratings,
          feedbackText,
          contactPermission,
          createdAt: serverTimestamp(),
          status: 'new' // For tracking feedback status (new, reviewed, resolved)
        };
        
        // Add user data if available
        if (currentUser) {
          feedbackData.userId = currentUser.uid;
          feedbackData.userEmail = currentUser.email;
          feedbackData.userName = currentUser.displayName || '';
        }
        
        // Save to Firestore
        const feedbackRef = collection(db, 'feedback');
        await addDoc(feedbackRef, feedbackData);
        
        console.log('Feedback submitted successfully:', feedbackData);
        toast.success('Thank you for your feedback!');
        
        // Show success message
        setSubmitted(true);
        
        // Reset form after submission
        setTimeout(() => {
          setFeedbackType('');
          setSatisfaction(null);
          setRatings({
            usability: 0,
            features: 0,
            recommendations: 0,
            support: 0,
            overall: 0
          });
          setFeedbackText('');
          setContactPermission(false);
          setSubmitted(false);
        }, 3000);
      } catch (error) {
        console.error('Error submitting feedback:', error);
        toast.error('Failed to submit feedback. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const StarRating = ({ category, value, onChange }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`focus:outline-none transition-colors ${
              star <= value ? 'text-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => onChange(category, star)}
          >
            <FiStar 
              className={`w-6 h-6 ${star <= value ? 'fill-yellow-400 stroke-yellow-400' : ''}`} 
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16 bg-gradient-to-r from-indigo-800 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white">We Value Your Feedback</h1>
          <p className="mt-2 text-indigo-200 max-w-3xl mx-auto">
            Help us improve your CareerAI experience by sharing your thoughts and suggestions
          </p>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {submitted ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <FiCheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You for Your Feedback!</h2>
            <p className="text-gray-600 mb-6">
              We appreciate you taking the time to share your thoughts with us. Your feedback helps us improve our platform for everyone.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Submit Another Response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8">
            {/* Feedback Type */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                What kind of feedback would you like to provide?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {feedbackTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    className={`border rounded-lg py-3 px-4 flex justify-center transition-colors ${
                      feedbackType === type.id
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setFeedbackType(type.id);
                      if (errors.feedbackType) {
                        setErrors(prev => ({ ...prev, feedbackType: undefined }));
                      }
                    }}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
              {errors.feedbackType && (
                <p className="mt-2 text-sm text-red-600">{errors.feedbackType}</p>
              )}
            </div>
            
            {/* Satisfaction Level */}
            <div className="mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                How satisfied are you with your overall experience?
              </label>
              <div className="flex justify-center space-x-8">
                {satisfactionEmojis.map((emoji) => (
                  <button
                    key={emoji.id}
                    type="button"
                    className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
                      satisfaction === emoji.id
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setSatisfaction(emoji.id);
                      if (errors.satisfaction) {
                        setErrors(prev => ({ ...prev, satisfaction: undefined }));
                      }
                    }}
                  >
                    {emoji.icon}
                    <span className="mt-2 text-sm">{emoji.label}</span>
                  </button>
                ))}
              </div>
              {errors.satisfaction && (
                <p className="mt-2 text-sm text-red-600">{errors.satisfaction}</p>
              )}
            </div>
            
            {/* Detailed Ratings */}
            <div className="mb-8">
              <h3 className="text-gray-700 font-medium mb-4">
                Please rate your experience with the following aspects:
              </h3>
              
              <div className="space-y-4">
                <div className="flex flex-wrap justify-between items-center">
                  <label className="text-gray-600 w-full sm:w-48 mb-2 sm:mb-0">Platform Usability</label>
                  <StarRating
                    category="usability"
                    value={ratings.usability}
                    onChange={handleRatingChange}
                  />
                </div>
                
                <div className="flex flex-wrap justify-between items-center">
                  <label className="text-gray-600 w-full sm:w-48 mb-2 sm:mb-0">Features & Tools</label>
                  <StarRating
                    category="features"
                    value={ratings.features}
                    onChange={handleRatingChange}
                  />
                </div>
                
                <div className="flex flex-wrap justify-between items-center">
                  <label className="text-gray-600 w-full sm:w-48 mb-2 sm:mb-0">Career Recommendations</label>
                  <StarRating
                    category="recommendations"
                    value={ratings.recommendations}
                    onChange={handleRatingChange}
                  />
                </div>
                
                <div className="flex flex-wrap justify-between items-center">
                  <label className="text-gray-600 w-full sm:w-48 mb-2 sm:mb-0">Support & Assistance</label>
                  <StarRating
                    category="support"
                    value={ratings.support}
                    onChange={handleRatingChange}
                  />
                </div>
                
                <div className="flex flex-wrap justify-between items-center pt-4 border-t">
                  <label className="text-gray-700 font-medium w-full sm:w-48 mb-2 sm:mb-0">Overall Experience</label>
                  <StarRating
                    category="overall"
                    value={ratings.overall}
                    onChange={(category, value) => {
                      handleRatingChange(category, value);
                      if (errors.overallRating) {
                        setErrors(prev => ({ ...prev, overallRating: undefined }));
                      }
                    }}
                  />
                </div>
                {errors.overallRating && (
                  <p className="mt-2 text-sm text-red-600">{errors.overallRating}</p>
                )}
              </div>
            </div>
            
            {/* Detailed Feedback */}
            <div className="mb-8">
              <label htmlFor="feedback" className="block text-gray-700 font-medium mb-3">
                Please provide more details:
              </label>
              <textarea
                id="feedback"
                rows="5"
                className={`w-full px-4 py-3 border rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.feedbackText ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Share your thoughts, suggestions, or report an issue..."
                value={feedbackText}
                onChange={(e) => {
                  setFeedbackText(e.target.value);
                  if (e.target.value.trim().length >= 10 && errors.feedbackText) {
                    setErrors(prev => ({ ...prev, feedbackText: undefined }));
                  }
                }}
                maxLength={500}
              ></textarea>
              <div className="flex justify-between mt-2">
                {errors.feedbackText ? (
                  <p className="text-sm text-red-600">{errors.feedbackText}</p>
                ) : (
                  <p className="text-sm text-gray-500">Minimum 10 characters</p>
                )}
                <p className="text-sm text-gray-500">{feedbackText.length} / 500</p>
              </div>
            </div>
            
            {/* Contact Permission (Optional) */}
            <div className="mb-8">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="contact"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    checked={contactPermission}
                    onChange={(e) => setContactPermission(e.target.checked)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="contact" className="text-gray-600">
                    I'm willing to be contacted about my feedback if needed
                  </label>
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FiSend className="mr-2" />
                    Submit Feedback
                  </>
                )}
              </button>
            </div>
          </form>
        )}
        
        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-medium text-gray-800 mb-2">What happens to my feedback?</h3>
              <p className="text-gray-600">
                Your feedback is reviewed by our product team and used to identify areas for improvement. We prioritize features and fixes based on user feedback.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-medium text-gray-800 mb-2">How can I report urgent issues?</h3>
              <p className="text-gray-600">
                For urgent issues or technical support, please contact our support team directly at support@careerai.com or use the chat feature in the platform.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-medium text-gray-800 mb-2">Will I receive a response to my feedback?</h3>
              <p className="text-gray-600">
                If you've provided contact information and checked the permission box, we may reach out for additional insights. While we can't respond to every feedback submission, rest assured that all feedback is reviewed.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-indigo-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Help Us Shape the Future of CareerAI</h2>
          <div className="flex justify-center space-x-4">
            <a 
              href="#" 
              className="bg-indigo-700 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Join User Research
            </a>
            <a 
              href="#" 
              className="bg-white text-indigo-700 hover:bg-gray-100 px-6 py-3 rounded-lg transition-colors"
            >
              View Roadmap
            </a>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UserFeedback;