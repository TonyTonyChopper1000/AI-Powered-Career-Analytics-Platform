import React from 'react';
import { FiBarChart2, FiTrendingUp, FiZap, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-white font-bold text-xl flex items-center">
                <FiBarChart2 className="mr-2 h-6 w-6" />
                <span>CareerAI</span>
              </div>
            </div>
            <div className="hidden md:flex space-x-8 text-gray-200">
              <a href="#" className="hover:text-white transition-colors">Features</a>
              <a href="#" className="hover:text-white transition-colors">How It Works</a>
              <a href="#" className="hover:text-white transition-colors">Pricing</a>
              <a href="#" className="hover:text-white transition-colors">About</a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-200 hover:text-white transition-colors">Login</a>
              <a href="#" className="bg-white text-indigo-600 hover:bg-gray-100 transition-colors font-medium px-4 py-2 rounded-lg">Get Started</a>
            </div>
          </div>
        </nav>

        {/* Hero content */}
        <div className="py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left column - Text content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Supercharge Your Career With AI Analytics
                </h1>
                <p className="mt-6 text-xl text-indigo-100">
                  Make data-driven career decisions with our AI-powered platform that analyzes market trends, matches your skills, and guides your professional growth.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <FiCheckCircle className="h-6 w-6 text-indigo-300 mr-3 mt-0.5" />
                  <p className="text-indigo-100">
                    <span className="font-medium text-white">Skill Gap Analysis</span> - Identify what skills you need to develop for your dream role
                  </p>
                </div>
                <div className="flex items-start">
                  <FiCheckCircle className="h-6 w-6 text-indigo-300 mr-3 mt-0.5" />
                  <p className="text-indigo-100">
                    <span className="font-medium text-white">Salary Insights</span> - Get accurate compensation data based on your experience and location
                  </p>
                </div>
                <div className="flex items-start">
                  <FiCheckCircle className="h-6 w-6 text-indigo-300 mr-3 mt-0.5" />
                  <p className="text-indigo-100">
                    <span className="font-medium text-white">Market Demand Forecasting</span> - Anticipate industry trends before they happen
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="#" className="bg-white hover:bg-gray-100 text-indigo-600 font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors">
                  Start Free Trial <FiArrowRight className="ml-2" />
                </a>
                <a href="#" className="border border-indigo-400 text-white hover:bg-indigo-700 font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors">
                  Watch Demo
                </a>
              </div>

              <div className="pt-2">
                <p className="text-indigo-200 text-sm">
                  Join over 10,000+ professionals already advancing their careers
                </p>
                <div className="flex mt-4 space-x-6">
                  {/* Company logos could go here */}
                  <div className="h-8 w-24 bg-white/10 rounded-md flex items-center justify-center text-white/80 text-xs">Company A</div>
                  <div className="h-8 w-24 bg-white/10 rounded-md flex items-center justify-center text-white/80 text-xs">Company B</div>
                  <div className="h-8 w-24 bg-white/10 rounded-md flex items-center justify-center text-white/80 text-xs">Company C</div>
                </div>
              </div>
            </div>

            {/* Right column - Visual content */}
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-500 rounded-full opacity-30 blur-2xl"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-purple-600 rounded-full opacity-30 blur-3xl"></div>
              
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-indigo-500 rounded-full p-2 shadow-lg">
                  <FiZap className="h-6 w-6 text-white" />
                </div>
                
                {/* Dashboard preview */}
                <div className="rounded-xl bg-indigo-950/80 p-5">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white font-medium">Career Analytics Dashboard</h3>
                    <div className="text-indigo-300 text-sm">Updated today</div>
                  </div>
                  
                  {/* Skills match graph */}
                  <div className="mb-6">
                    <h4 className="text-indigo-200 text-sm mb-3">Skills Match Analysis</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white">Data Analysis</span>
                          <span className="text-indigo-300">92%</span>
                        </div>
                        <div className="w-full bg-indigo-800/50 rounded-full h-2">
                          <div className="bg-indigo-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white">Machine Learning</span>
                          <span className="text-indigo-300">78%</span>
                        </div>
                        <div className="w-full bg-indigo-800/50 rounded-full h-2">
                          <div className="bg-indigo-400 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white">Python</span>
                          <span className="text-indigo-300">85%</span>
                        </div>
                        <div className="w-full bg-indigo-800/50 rounded-full h-2">
                          <div className="bg-indigo-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white">Cloud Computing</span>
                          <span className="text-indigo-300">65%</span>
                        </div>
                        <div className="w-full bg-indigo-800/50 rounded-full h-2">
                          <div className="bg-indigo-400 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Salary insights */}
                  <div className="mb-6">
                    <h4 className="text-indigo-200 text-sm mb-3">Salary Insights</h4>
                    <div className="flex items-center">
                      <div className="p-4 bg-indigo-800/30 rounded-lg">
                        <div className="text-xs text-indigo-300">Current Market</div>
                        <div className="text-xl font-bold text-white">$95,000</div>
                      </div>
                      <div className="flex-1 ml-3">
                        <div className="flex items-center text-green-400 text-sm">
                          <FiTrendingUp className="mr-1" /> +15% above average
                        </div>
                        <div className="text-xs text-indigo-300 mt-1">Based on your experience level</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Recommended roles */}
                  <div>
                    <h4 className="text-indigo-200 text-sm mb-3">Recommended Roles</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-indigo-800/30 rounded-lg">
                        <div className="text-white text-sm">Data Scientist</div>
                        <div className="text-xs text-green-400">96% Match</div>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-indigo-800/30 rounded-lg">
                        <div className="text-white text-sm">ML Engineer</div>
                        <div className="text-xs text-green-400">92% Match</div>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-indigo-800/30 rounded-lg">
                        <div className="text-white text-sm">AI Research Analyst</div>
                        <div className="text-xs text-green-400">89% Match</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating stats */}
     
    </div>
  );
};

export default Hero;