import React, { useState, useEffect } from 'react';
import { FiBarChart2, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-indigo-900/95 backdrop-blur-sm py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-white font-bold text-xl flex items-center">
              <FiBarChart2 className="mr-2 h-6 w-6" />
              <span>CareerAI</span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-gray-200">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-gray-200 hover:text-white transition-colors">Login</a>
            <a href="#" className="bg-white text-indigo-600 hover:bg-gray-100 transition-colors font-medium px-4 py-2 rounded-lg">Get Started</a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-200 hover:text-white"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-900/95 backdrop-blur-sm shadow-lg py-4">
          <div className="px-4 space-y-3">
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="block text-gray-200 hover:text-white transition-colors py-2">Features</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="block text-gray-200 hover:text-white transition-colors py-2">Services</a>
            <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="block text-gray-200 hover:text-white transition-colors py-2">Testimonials</a>
            <a href="#" onClick={() => setIsMenuOpen(false)} className="block text-gray-200 hover:text-white transition-colors py-2">Pricing</a>
            <a href="#" onClick={() => setIsMenuOpen(false)} className="block text-gray-200 hover:text-white transition-colors py-2">About</a>
            <div className="pt-4 space-y-3">
              <a href="#" onClick={() => setIsMenuOpen(false)} className="block text-gray-200 hover:text-white transition-colors py-2">Login</a>
              <a href="#" onClick={() => setIsMenuOpen(false)} className="block bg-white text-indigo-600 hover:bg-gray-100 transition-colors font-medium px-4 py-2 rounded-lg text-center">Get Started</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;