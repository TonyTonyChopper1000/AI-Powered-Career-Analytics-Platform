import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiBarChart2, FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { signOut } from "../firebase"
import { AuthContext } from "../contexts/AuthContext"
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

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

  const handleLogout = async () => {
    try {
      const result = await signOut();
      if (result.success) {
        toast.success("Logged out successfully");
        navigate('/');
      } else {
        toast.error(result.error || "Failed to log out");
      }
    } catch (error) {
      toast.error("An error occurred while logging out");
    }
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-indigo-900/95 backdrop-blur-sm py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to={currentUser?.role === 'admin' ? '/admin/dashboard' : '/home'} className="text-white font-bold text-xl flex items-center">
              <FiBarChart2 className="mr-2 h-6 w-6" />
              <span>CareerAI</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-gray-200">
            {currentUser?.role === 'admin' ? (
              <>
                <Link to="/admin/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                <Link to="/admin/users" className="hover:text-white transition-colors">Users</Link>
                <Link to="/admin/reports" className="hover:text-white transition-colors">Reports</Link>
              </>
            ) : (
              <>
                <Link to="/home" className="hover:text-white transition-colors">Home</Link>
                <Link to="/features" className="hover:text-white transition-colors">Features</Link>
                <Link to="/services" className="hover:text-white transition-colors">Services</Link>
                <Link to="/feedback" className="hover:text-white transition-colors">Feedback</Link>
              </>
            )}
          </div>
          
          {currentUser ? (
            <div className="hidden md:flex items-center space-x-4 relative">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center space-x-2 text-gray-200 hover:text-white transition-colors"
              >
                <span className="text-sm font-medium">{currentUser.firstName || currentUser.email}</span>
                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                  <FiUser className="h-4 w-4" />
                </div>
              </button>
              
              {/* Profile dropdown */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 top-full">
                  <div className="px-4 py-2 text-xs text-gray-500">
                    Logged in as <span className="font-medium">{currentUser.role}</span>
                  </div>
                  <Link
                    to="/userprofile"
                    onClick={closeMenus}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={closeMenus}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className="text-gray-200 hover:text-white transition-colors">Login</Link>
              <Link to="/register" className="bg-white text-indigo-600 hover:bg-gray-100 transition-colors font-medium px-4 py-2 rounded-lg">
                Get Started
              </Link>
            </div>
          )}
          
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
            {currentUser?.role === 'admin' ? (
              <>
                <Link to="/admin/dashboard" onClick={closeMenus} className="block text-gray-200 hover:text-white transition-colors py-2">Dashboard</Link>
                <Link to="/admin/users" onClick={closeMenus} className="block text-gray-200 hover:text-white transition-colors py-2">Users</Link>
                <Link to="/admin/reports" onClick={closeMenus} className="block text-gray-200 hover:text-white transition-colors py-2">Reports</Link>
              </>
            ) : (
              <>
                <Link to="/home" onClick={closeMenus} className="block text-gray-200 hover:text-white transition-colors py-2">Home</Link>
                <Link to="/features" onClick={closeMenus} className="block text-gray-200 hover:text-white transition-colors py-2">Features</Link>
                <Link to="/services" onClick={closeMenus} className="block text-gray-200 hover:text-white transition-colors py-2">Services</Link>
                <Link to="/feedback" onClick={closeMenus} className="block text-gray-200 hover:text-white transition-colors py-2">Feedback</Link>
              </>
            )}
            
            {currentUser ? (
              <div className="border-t border-indigo-800 pt-4 mt-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                    <FiUser className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{currentUser.firstName || 'User'}</div>
                    <div className="text-xs text-gray-300">{currentUser.email}</div>
                  </div>
                </div>
                <Link to="/userprofile" onClick={closeMenus} className="block text-gray-200 hover:text-white transition-colors py-2">
                  Your Profile
                </Link>
                <Link to="/settings" onClick={closeMenus} className="block text-gray-200 hover:text-white transition-colors py-2">
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-200 hover:text-white transition-colors py-2"
                >
                  <FiLogOut className="mr-2 h-4 w-4" />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="border-t border-indigo-800 pt-4 mt-4 space-y-3">
                <Link to="/" onClick={closeMenus} className="block text-gray-200 hover:text-white transition-colors py-2">
                  Login
                </Link>
                <Link to="/register" onClick={closeMenus} className="block bg-white text-indigo-600 hover:bg-gray-100 transition-colors font-medium px-4 py-2 rounded-lg text-center">
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;