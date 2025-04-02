import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiFilter, FiBriefcase, FiUsers, FiStar, FiMessageCircle, FiCalendar, FiThumbsUp, FiAward, FiCheck, FiInfo, FiAlertCircle } from 'react-icons/fi';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getGPTSuggestedMentors, requestMentorMatch, getUserMentorRequests } from '../services/mentorMatchingService';

const MentorMatchingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [suggestedMentors, setSuggestedMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    industry: '',
    expertise: '',
    experience: '',
  });
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');
  const [pendingRequests, setPendingRequests] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Available filter options
  const industryOptions = [
    'Technology', 'Finance', 'Healthcare', 'Education', 
    'Marketing', 'Design', 'Engineering', 'Business', 'Data Science'
  ];
  
  const expertiseOptions = [
    'Career Transition', 'Leadership', 'Technical Skills', 
    'Entrepreneurship', 'Communication', 'Management', 'Work-Life Balance'
  ];
  
  const experienceOptions = [
    'Less than 5 years', '5-10 years', '10-15 years', '15+ years'
  ];
  
  // Fetch current user and suggested mentors on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get current user
        const user = auth.currentUser;
        if (!user) {
          navigate('/login');
          return;
        }
        
        setCurrentUser(user);
        
        // Get suggested mentors using GPT-based matching
        const mentors = await getGPTSuggestedMentors(user.uid);
        setSuggestedMentors(mentors);
        setFilteredMentors(mentors);
        
        // Get pending mentor requests
        const requests = await getUserMentorRequests(user.uid);
        setPendingRequests(requests.filter(req => req.status === 'pending'));
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load mentor recommendations');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [navigate]);
  
  // Handle search and filter changes
  useEffect(() => {
    if (suggestedMentors.length === 0) return;
    
    let results = [...suggestedMentors];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(mentor => 
        mentor.name?.toLowerCase().includes(query) ||
        mentor.bio?.toLowerCase().includes(query) ||
        mentor.industry?.toLowerCase().includes(query) ||
        mentor.expertiseAreas?.some(area => area.toLowerCase().includes(query))
      );
    }
    
    // Apply filters
    if (filters.industry) {
      results = results.filter(mentor => 
        mentor.industry?.toLowerCase() === filters.industry.toLowerCase()
      );
    }
    
    if (filters.expertise) {
      results = results.filter(mentor => 
        mentor.expertiseAreas?.some(area => 
          area.toLowerCase() === filters.expertise.toLowerCase()
        )
      );
    }
    
    if (filters.experience) {
      results = results.filter(mentor => {
        if (filters.experience === 'Less than 5 years') return mentor.yearsOfExperience < 5;
        if (filters.experience === '5-10 years') return mentor.yearsOfExperience >= 5 && mentor.yearsOfExperience < 10;
        if (filters.experience === '10-15 years') return mentor.yearsOfExperience >= 10 && mentor.yearsOfExperience < 15;
        if (filters.experience === '15+ years') return mentor.yearsOfExperience >= 15;
        return true;
      });
    }
    
    setFilteredMentors(results);
  }, [searchQuery, filters, suggestedMentors]);
  
  // Handle requesting a mentor
  const handleRequestMentor = async () => {
    if (!selectedMentor) return;
    
    try {
      setLoadingRequest(true);
      
      // Check if there's already a pending request for this mentor
      const existingRequest = pendingRequests.find(req => req.mentorId === selectedMentor.id);
      if (existingRequest) {
        toast.info('You already have a pending request with this mentor');
        setShowRequestForm(false);
        setLoadingRequest(false);
        return;
      }
      
      // Send mentor request
      await requestMentorMatch(
        currentUser.uid,
        selectedMentor.id,
        requestMessage
      );
      
      toast.success('Mentor request sent successfully');
      
      // Update pending requests
      const updatedRequests = [
        ...pendingRequests,
        {
          mentorId: selectedMentor.id,
          userId: currentUser.uid,
          message: requestMessage,
          status: 'pending',
          createdAt: new Date()
        }
      ];
      setPendingRequests(updatedRequests);
      
      // Reset form
      setShowRequestForm(false);
      setRequestMessage('');
      setSelectedMentor(null);
      setLoadingRequest(false);
    } catch (error) {
      console.error('Error requesting mentor:', error);
      toast.error('Failed to send mentor request');
      setLoadingRequest(false);
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setFilters({
      industry: '',
      expertise: '',
      experience: ''
    });
    setSearchQuery('');
  };
  
  // Calculate compatibility percentage from GPT score
  const formatCompatibility = (score) => {
    return Math.min(Math.round(score), 100);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero section */}
      <div className="pt-24 pb-12 bg-gradient-to-r from-indigo-700 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white">Find Your Perfect Mentor</h1>
          <p className="mt-3 max-w-md mx-auto text-indigo-100 sm:text-lg">
            AI-powered mentor matching to accelerate your career growth
          </p>
          
          {/* Search bar */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="flex items-center bg-white rounded-lg shadow-md">
              <div className="pl-4">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search mentors by name, expertise, or industry..."
                className="block w-full py-3 pl-3 pr-10 border-0 rounded-lg focus:outline-none focus:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                <button
                  onClick={resetFilters}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Reset
                </button>
              </div>
              
              {/* Industry filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <select
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={filters.industry}
                  onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
                >
                  <option value="">All Industries</option>
                  {industryOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              {/* Expertise filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expertise
                </label>
                <select
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={filters.expertise}
                  onChange={(e) => setFilters({ ...filters, expertise: e.target.value })}
                >
                  <option value="">All Expertise</option>
                  {expertiseOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              {/* Experience filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience
                </label>
                <select
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={filters.experience}
                  onChange={(e) => setFilters({ ...filters, experience: e.target.value })}
                >
                  <option value="">All Experience Levels</option>
                  {experienceOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              {/* Filter stats */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-medium text-gray-900">{filteredMentors.length}</span> of <span className="font-medium text-gray-900">{suggestedMentors.length}</span> mentors
                </p>
              </div>
            </div>
            
            {/* Pending requests */}
            {pendingRequests.length > 0 && (
              <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Pending Requests</h3>
                <div className="space-y-4">
                  {pendingRequests.map((request, index) => {
                    // Find the mentor for this request
                    const mentor = suggestedMentors.find(m => m.id === request.mentorId);
                    return (
                      <div key={index} className="flex items-start p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                        <FiInfo className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {mentor?.name || 'Mentor'}
                          </p>
                          <p className="text-xs text-gray-500">
                            Requested on {request.createdAt?.toDate?.().toLocaleDateString() || new Date().toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : filteredMentors.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <FiAlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No mentors found</h3>
                <p className="mt-1 text-gray-500">
                  Try adjusting your search criteria or removing some filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMentors.map((mentor) => (
                  <div key={mentor.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {/* Compatibility score header */}
                    <div className="bg-indigo-50 px-4 py-2 flex justify-between items-center">
                      <div className="flex items-center">
                        <FiCheck className="h-4 w-4 text-indigo-600 mr-1" />
                        <span className="text-sm font-medium text-indigo-700">
                          {formatCompatibility(mentor.gptCompatibilityScore)}% Match
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        AI-Powered Match
                      </div>
                    </div>
                    
                    {/* Mentor card body */}
                    <div className="p-6">
                      <div className="flex items-start">
                        {/* Avatar */}
                        <div className="mr-4 flex-shrink-0">
                          <div className="bg-indigo-100 h-16 w-16 rounded-full flex items-center justify-center text-xl font-bold text-indigo-700">
                            {mentor.name?.charAt(0) || 'M'}
                          </div>
                        </div>
                        
                        {/* Info */}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{mentor.name}</h3>
                          <p className="text-sm text-gray-500">{mentor.jobTitle}</p>
                          <div className="mt-1 flex items-center">
                            <FiBriefcase className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">{mentor.company}</span>
                          </div>
                          <div className="mt-1 flex items-center">
                            <FiStar className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-xs text-gray-500">{mentor.yearsOfExperience} years experience</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Expertise areas */}
                      <div className="mt-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">Expertise</div>
                        <div className="flex flex-wrap gap-2">
                          {mentor.expertiseAreas?.map((area, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Bio */}
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 line-clamp-3">{mentor.bio}</p>
                      </div>
                      
                      {/* AI match reason */}
                      <div className="mt-4 p-3 bg-purple-50 rounded-md">
                        <div className="flex">
                          <FiAward className="h-5 w-5 text-purple-600 mr-2 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-700">{mentor.gptMatchReason}</p>
                            {mentor.gptCareerAdvice && (
                              <p className="mt-1 text-xs text-gray-600">{mentor.gptCareerAdvice}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="mt-4 flex justify-between">
                        <button
                          className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                          onClick={() => {
                            // Navigate to mentor profile
                            // For now, just show the request modal
                            setSelectedMentor(mentor);
                            setShowRequestForm(true);
                          }}
                        >
                          <FiUsers className="mr-1 h-4 w-4" />
                          View Profile
                        </button>
                        
                        <button
                          className="flex items-center px-3 py-1.5 border border-indigo-500 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-sm font-medium transition-colors"
                          onClick={() => {
                            setSelectedMentor(mentor);
                            setShowRequestForm(true);
                          }}
                          disabled={pendingRequests.some(req => req.mentorId === mentor.id)}
                        >
                          {pendingRequests.some(req => req.mentorId === mentor.id) ? (
                            <>
                              <FiCheck className="mr-1 h-4 w-4" />
                              Request Sent
                            </>
                          ) : (
                            <>
                              <FiMessageCircle className="mr-1 h-4 w-4" />
                              Request
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mentor request modal */}
      {showRequestForm && selectedMentor && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowRequestForm(false)}></div>
          <div className="relative bg-white rounded-lg max-w-md w-full mx-4 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Request Mentorship</h2>
            
            <div className="mb-6 flex items-center">
              <div className="bg-indigo-100 h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold text-indigo-700 mr-3">
                {selectedMentor.name?.charAt(0) || 'M'}
              </div>
              <div>
                <p className="font-medium text-gray-900">{selectedMentor.name}</p>
                <p className="text-sm text-gray-500">{selectedMentor.jobTitle} at {selectedMentor.company}</p>
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Introduction Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Introduce yourself and explain why you'd like to connect with this mentor..."
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
              ></textarea>
              <p className="mt-1 text-xs text-gray-500">
                Be specific about your goals and what you hope to learn from this mentor.
              </p>
            </div>
            
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
              <button
                type="button"
                className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setShowRequestForm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`w-full sm:w-auto flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  loadingRequest || !requestMessage.trim()
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
                onClick={handleRequestMentor}
                disabled={loadingRequest || !requestMessage.trim()}
              >
                {loadingRequest ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Request'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* How it works section */}
      <div className="bg-indigo-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">How Mentor Matching Works</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Our AI-powered system analyzes your skills, goals, and preferences to find the perfect mentor for your career journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-lg shadow-sm p-6 relative">
              <div className="absolute -top-4 -left-4 bg-indigo-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="text-center mb-4">
                <div className="bg-indigo-100 mx-auto w-16 h-16 rounded-full flex items-center justify-center">
                  <FiUsers className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Complete Your Profile</h3>
              <p className="text-gray-600 text-center">
                Add your skills, experience, and career goals so we can find the best matches for you.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white rounded-lg shadow-sm p-6 relative">
              <div className="absolute -top-4 -left-4 bg-indigo-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="text-center mb-4">
                <div className="bg-indigo-100 mx-auto w-16 h-16 rounded-full flex items-center justify-center">
                  <FiSearch className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Browse AI Matches</h3>
              <p className="text-gray-600 text-center">
                Review your personalized mentor recommendations and find the perfect fit.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white rounded-lg shadow-sm p-6 relative">
              <div className="absolute -top-4 -left-4 bg-indigo-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className="text-center mb-4">
                <div className="bg-indigo-100 mx-auto w-16 h-16 rounded-full flex items-center justify-center">
                  <FiCalendar className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Connect & Grow</h3>
              <p className="text-gray-600 text-center">
                Schedule sessions with your mentor and start your journey toward career success.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Success Stories</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              See how our mentorship matching has helped professionals like you achieve their goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex-shrink-0"></div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Sarah J.</h4>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The mentor matching system connected me with a senior engineer who helped me transition from frontend to full-stack development. Within 6 months, I secured a new role with a 30% salary increase."
              </p>
              <div className="mt-4 flex text-yellow-400">
                <FiStar className="h-5 w-5 fill-current" />
                <FiStar className="h-5 w-5 fill-current" />
                <FiStar className="h-5 w-5 fill-current" />
                <FiStar className="h-5 w-5 fill-current" />
                <FiStar className="h-5 w-5 fill-current" />
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex-shrink-0"></div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Michael T.</h4>
                  <p className="text-sm text-gray-500">Marketing Specialist</p>
                </div>
              </div>
              <p className="text-gray-600">
                "My mentor provided invaluable guidance on digital marketing strategies that I could immediately apply. The AI matching was spot-on—it was like they knew exactly what I needed to progress in my career."
              </p>
              <div className="mt-4 flex text-yellow-400">
                <FiStar className="h-5 w-5 fill-current" />
                <FiStar className="h-5 w-5 fill-current" />
                <FiStar className="h-5 w-5 fill-current" />
                <FiStar className="h-5 w-5 fill-current" />
                <FiStar className="h-5 w-5 fill-current" />
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex-shrink-0"></div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Priya R.</h4>
                  <p className="text-sm text-gray-500">Product Manager</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As someone transitioning from engineering to product management, having a mentor who had made the same career pivot was priceless. The AI matching found me the perfect mentor who understood my journey."
              </p>
              <div className="mt-4 flex text-yellow-400">
                <FiStar className="h-5 w-5 fill-current" />
                <FiStar className="h-5 w-5 fill-current" />
                <FiStar className="h-5 w-5 fill-current" />
                <FiStar className="h-5 w-5 fill-current" />
                <FiStar className="h-5 w-5 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-indigo-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white">Ready to Accelerate Your Career?</h2>
          <p className="mt-4 text-indigo-200 max-w-2xl mx-auto">
            Complete your profile to get personalized mentor recommendations.
          </p>
          <div className="mt-8">
            <button 
              onClick={() => navigate('/userprofile')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
            >
              Update Your Profile
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MentorMatchingPage;