import React, { useState, useEffect, useContext } from 'react';
import { FiDollarSign, FiBarChart2, FiTrendingUp, FiAward, FiMapPin, FiInfo, FiPlus, FiX, FiBriefcase, FiUsers } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { predictSalary, getSkillMarketTrends } from '../services/salaryPredictionService';
import { AuthContext } from '../contexts/AuthContext';
import { getUserProfile } from '../services/mentorMatchingService';

const SalaryPredictionPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('mid');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('medium');
  const [predictionResult, setPredictionResult] = useState(null);
  const [marketTrends, setMarketTrends] = useState([]);
  const [userId, setUserId] = useState(null);
  
  // Sample skills for suggestions
  const skillSuggestions = [
    'JavaScript', 'Python', 'React', 'Machine Learning', 'AWS', 
    'Data Analysis', 'SQL', 'Java', 'DevOps', 'Product Management',
    'UX Design', 'Node.js', 'Docker', 'Kubernetes', 'TypeScript',
    'GraphQL', 'Go', 'Ruby on Rails', 'C#', 'Swift',
    'Project Management', 'Agile', 'Digital Marketing', 'Cybersecurity', 'Blockchain'
  ];
  
  // Options for form
  const experienceLevelOptions = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'junior', label: 'Junior (2-4 years)' },
    { value: 'mid', label: 'Mid-Level (4-7 years)' },
    { value: 'senior', label: 'Senior (7-10 years)' },
    { value: 'lead', label: 'Lead/Principal (10+ years)' },
    { value: 'executive', label: 'Executive' }
  ];
  
  const industryOptions = [
    'Technology', 'Finance', 'Healthcare', 'E-commerce', 'Education',
    'Gaming', 'Marketing', 'Media', 'Manufacturing', 'Government',
    'Consulting', 'Telecommunications', 'Insurance', 'Retail', 'Energy'
  ];
  
  const companySizeOptions = [
    { value: 'startup', label: 'Startup (<50 employees)' },
    { value: 'small', label: 'Small (50-200 employees)' },
    { value: 'medium', label: 'Medium (201-1000 employees)' },
    { value: 'large', label: 'Large (1001-5000 employees)' },
    { value: 'enterprise', label: 'Enterprise (5000+ employees)' }
  ];
  
  const locationOptions = [
    'San Francisco', 'New York', 'Seattle', 'Boston', 'Austin',
    'Chicago', 'Los Angeles', 'Denver', 'Washington DC', 'Atlanta',
    'Remote', 'London', 'Berlin', 'Toronto', 'Sydney',
    'Singapore', 'Tokyo', 'Zurich', 'Amsterdam', 'Paris'
  ];
  
  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setInitialLoading(true);
        
        if (currentUser && currentUser.uid) {
          setUserId(currentUser.uid);
          
          // Fetch user profile
          const userProfile = await getUserProfile(currentUser.uid);
          
          if (userProfile) {
            // Pre-fill form with user profile data
            if (userProfile.skills && userProfile.skills.length > 0) {
              setSkills(userProfile.skills);
            }
            
            if (userProfile.experienceLevel) {
              setExperienceLevel(userProfile.experienceLevel);
            }
            
            if (userProfile.location) {
              setLocation(userProfile.location);
            }
            
            if (userProfile.industry) {
              setIndustry(userProfile.industry);
            }
            
            // Make initial prediction
            if (userProfile.skills && userProfile.skills.length > 0) {
              await handleSalaryPrediction(
                userProfile.skills,
                userProfile.experienceLevel || 'mid',
                userProfile.location || 'Remote',
                userProfile.industry || 'Technology',
                'medium'
              );
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setInitialLoading(false);
      }
    };
    
    fetchUserData();
  }, [currentUser]);
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (skills.length === 0) {
      alert('Please add at least one skill for accurate prediction');
      return;
    }
    
    await handleSalaryPrediction(skills, experienceLevel, location, industry, companySize);
  };
  
  // Make salary prediction
  const handleSalaryPrediction = async (
    currentSkills, 
    currentExperience, 
    currentLocation, 
    currentIndustry, 
    currentCompanySize
  ) => {
    setLoading(true);
    
    try {
      // Get salary prediction
      const prediction = predictSalary(
        currentSkills,
        currentExperience,
        currentLocation,
        currentIndustry,
        currentCompanySize
      );
      
      // Get market trends for skills
      const trends = getSkillMarketTrends(currentSkills);
      
      // Update state with results
      setPredictionResult(prediction);
      setMarketTrends(trends);
    } catch (error) {
      console.error('Error making prediction:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Add a new skill
  const addSkill = (skill) => {
    if (!skill.trim()) return;
    
    // Check if skill already exists
    if (skills.some(s => s.toLowerCase() === skill.toLowerCase())) {
      return;
    }
    
    setSkills([...skills, skill.trim()]);
    setNewSkill('');
  };
  
  // Remove a skill
  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-12 bg-gradient-to-r from-indigo-700 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white">AI Salary Prediction</h1>
          <p className="mt-3 max-w-2xl mx-auto text-indigo-100 sm:text-lg">
            Get an accurate salary estimate based on your skills, experience, and location
          </p>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Prediction form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-indigo-50 border-b border-indigo-100">
                <h2 className="text-lg font-medium text-gray-900">Your Career Profile</h2>
                <p className="mt-1 text-sm text-gray-500">Enter your details to get a salary prediction</p>
              </div>
              
              <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
                {/* Skills */}
                <div>
                  <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Skills
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="skills"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(newSkill))}
                      placeholder="Add a skill (e.g., JavaScript, Python, React)"
                      className="block w-full pr-10 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => addSkill(newSkill)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-indigo-600 hover:text-indigo-800"
                    >
                      <FiPlus className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {/* Skills list */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <div 
                        key={index} 
                        className="inline-flex items-center bg-indigo-50 text-indigo-800 rounded-full px-3 py-1 text-sm font-medium"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-1 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                        >
                          <FiX className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    
                    {skills.length === 0 && (
                      <p className="text-sm text-gray-500">Add your skills to get an accurate prediction</p>
                    )}
                  </div>
                  
                  {/* Skill suggestions */}
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-1">Suggested skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {skillSuggestions.slice(0, 6).map((skill, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => addSkill(skill)}
                          className="inline-flex text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full px-2 py-1"
                        >
                          + {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Experience Level */}
                <div>
                  <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">
                    Experience Level
                  </label>
                  <select
                    id="experienceLevel"
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {experienceLevelOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Location */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <select
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select Location</option>
                    {locationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Industry */}
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                    Industry
                  </label>
                  <select
                    id="industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select Industry</option>
                    {industryOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Company Size */}
                <div>
                  <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Size
                  </label>
                  <select
                    id="companySize"
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {companySizeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Submit button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={loading || skills.length === 0}
                    className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      loading || skills.length === 0
                        ? 'bg-indigo-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Predicting...
                      </>
                    ) : (
                      <>
                        <FiDollarSign className="mr-2 -ml-1 h-5 w-5" />
                        Predict Salary
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Right column - Prediction results */}
          <div className="lg:col-span-2">
            {initialLoading ? (
              <div className="bg-white rounded-lg shadow-sm h-64 flex items-center justify-center">
                <div className="text-center">
                  <svg className="animate-spin mx-auto h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="mt-3 text-gray-500">Loading your salary prediction...</p>
                </div>
              </div>
            ) : predictionResult ? (
              <div className="space-y-6">
                {/* Salary prediction card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="px-6 py-4 bg-indigo-600 text-white">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium">Estimated Salary</h2>
                      <FiBarChart2 className="h-5 w-5" />
                    </div>
                  </div>
                  
                  <div className="px-6 py-8 flex flex-col items-center justify-center border-b border-gray-100">
                    <div className="text-4xl font-bold text-gray-900">
                      {formatCurrency(predictionResult.prediction)}
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Estimated annual salary range:
                    </div>
                    <div className="text-lg font-medium text-gray-800">
                      {formatCurrency(predictionResult.range.min)} — {formatCurrency(predictionResult.range.max)}
                    </div>
                  </div>
                  
                  {/* Prediction factors */}
                  <div className="px-6 py-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Factors influencing this prediction:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 rounded-full p-1 bg-indigo-100">
                          <FiAward className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-xs text-gray-500">Experience Level</div>
                          <div className="text-sm font-medium text-gray-900">
                            {experienceLevelOptions.find(opt => opt.value === experienceLevel)?.label || experienceLevel}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="flex-shrink-0 rounded-full p-1 bg-indigo-100">
                          <FiMapPin className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-xs text-gray-500">Location</div>
                          <div className="text-sm font-medium text-gray-900">
                            {location || 'Remote'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="flex-shrink-0 rounded-full p-1 bg-indigo-100">
                          <FiBriefcase className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-xs text-gray-500">Industry</div>
                          <div className="text-sm font-medium text-gray-900">
                            {industry || 'Technology'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="flex-shrink-0 rounded-full p-1 bg-indigo-100">
                          <FiUsers className="h-4 w-4 text-indigo-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-xs text-gray-500">Company Size</div>
                          <div className="text-sm font-medium text-gray-900">
                            {companySizeOptions.find(opt => opt.value === companySize)?.label || companySize}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Insights card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="px-6 py-4 bg-purple-100 border-b border-purple-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium text-purple-900">AI-Powered Insights</h2>
                      <FiInfo className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                  
                  <div className="px-6 py-4">
                    <ul className="space-y-3">
                      {predictionResult.insights.map((insight, index) => (
                        <li key={index} className="flex">
                          <FiInfo className="h-5 w-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Market trends card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="px-6 py-4 bg-green-100 border-b border-green-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium text-green-900">Market Trends</h2>
                      <FiTrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  
                  <div className="px-6 py-4">
                    <div className="space-y-4">
                      {marketTrends.map((trend, index) => (
                        <div key={index} className="border-l-4 border-green-400 pl-4 py-2">
                          <div className="flex items-center">
                            <span className="font-medium text-gray-900">
                              {trend.skill === 'general' ? 'Market Overview' : trend.skill}
                            </span>
                            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                              trend.trend === 'rising' || trend.trend === 'rapidly rising'
                                ? 'bg-green-100 text-green-800'
                                : trend.trend === 'stable'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {trend.trend.charAt(0).toUpperCase() + trend.trend.slice(1)}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">{trend.insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <FiDollarSign className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No Prediction Yet</h3>
                <p className="mt-1 text-gray-500">
                  Add your skills and details to get a personalized salary prediction.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* How it works section */}
      <div className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">How Our Salary Prediction Works</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Our AI-powered prediction model analyzes multiple factors to provide accurate salary estimates specific to your profile.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                <FiUsers className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Skills Analysis</h3>
              <p className="text-gray-600">
                Our model evaluates your specific skills, identifying those in high demand and calculating their impact on your market value.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                <FiMapPin className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Market Factors</h3>
              <p className="text-gray-600">
                We account for location, industry, and company size to provide context-aware predictions adjusted for cost of living.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
                <FiTrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Career Recommendations</h3>
              <p className="text-gray-600">
                Beyond salary estimates, we provide insights on skill gaps and market trends to help you maximize your earning potential.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-indigo-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white">Ready to grow your career?</h2>
          <p className="mt-4 text-indigo-200 max-w-2xl mx-auto">
            Update your profile with additional skills and experience to get more accurate predictions.
          </p>
          <div className="mt-8">
            <button 
              onClick={() => window.location.href = '/userprofile'}
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

export default SalaryPredictionPage;