import React from 'react';
import { 
  FiBarChart2, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiLinkedin, 
  FiTwitter, 
  FiFacebook, 
  FiInstagram, 
  FiArrowRight 
} from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-indigo-950 text-indigo-200">
      {/* Newsletter Section */}
      <div className="border-b border-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Stay ahead of career trends</h3>
              <p className="mb-0">Get weekly AI-powered insights on market trends, in-demand skills, and salary updates.</p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-indigo-900 border border-indigo-800 text-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg flex items-center justify-center transition-colors">
                  Subscribe <FiArrowRight className="ml-2" />
                </button>
              </div>
              <p className="text-xs mt-2 text-indigo-400">By subscribing, you agree to our Privacy Policy and Terms of Service.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center text-white text-xl font-bold mb-4">
              <FiBarChart2 className="mr-2 h-6 w-6" />
              <span>CareerAI</span>
            </div>
            <p className="mb-4">
              Our AI-powered platform helps professionals make data-driven career decisions by analyzing market trends, 
              matching skills, and providing personalized growth recommendations.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="p-2 bg-indigo-900 hover:bg-indigo-800 rounded-full transition-colors">
                <FiLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-indigo-900 hover:bg-indigo-800 rounded-full transition-colors">
                <FiTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-indigo-900 hover:bg-indigo-800 rounded-full transition-colors">
                <FiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-indigo-900 hover:bg-indigo-800 rounded-full transition-colors">
                <FiInstagram className="h-5 w-5" />
              </a>
            </div>
            <div className="space-y-2">
              <div className="flex items-start">
                <FiMail className="h-5 w-5 mt-0.5 mr-3 text-indigo-400" />
                <span>support@careerai.com</span>
              </div>
              <div className="flex items-start">
                <FiPhone className="h-5 w-5 mt-0.5 mr-3 text-indigo-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start">
                <FiMapPin className="h-5 w-5 mt-0.5 mr-3 text-indigo-400" />
                <span>123 AI Boulevard, San Francisco, CA 94107</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Investor Relations</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Career Guides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Skill Assessment</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Salary Calculator</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Industry Reports</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">GDPR Compliance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessibility</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">© 2025 CareerAI. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="text-indigo-700">•</span>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <span className="text-indigo-700">•</span>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              <span className="text-indigo-700">•</span>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;