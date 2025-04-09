// src/components/admin/AdminTopNav.jsx
import React, { useState, useRef } from 'react';
import { 
  FiSearch, 
  FiCalendar, 
  FiChevronDown, 
  FiRefreshCw, 
  FiBell, 
  FiHelpCircle, 
  FiUser,
  FiMenu,
  FiLogOut,
  FiSettings
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { useOnClickOutside } from '../../utils/hooks';

const AdminTopNav = ({ onMenuToggle, dateRange = "This Month", setDateRange }) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  
  const profileRef = useRef();
  const dateRef = useRef();
  
  useOnClickOutside(profileRef, () => setProfileDropdownOpen(false));
  useOnClickOutside(dateRef, () => setDateDropdownOpen(false));
  
  const dateRanges = [
    "Today",
    "Yesterday",
    "Last 7 Days",
    "This Week",
    "Last Week",
    "This Month",
    "Last Month",
    "Last 3 Months",
    "Last 6 Months",
    "This Year",
    "Last Year",
    "All Time"
  ];
  
  const handleDateRangeChange = (range) => {
    setDateRange(range);
    setDateDropdownOpen(false);
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      // Redirect will be handled by the auth context
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };
  
  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <button
        className="md:hidden px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        onClick={onMenuToggle}
      >
        <FiMenu className="h-6 w-6" />
      </button>
      
      <div className="flex-1 flex justify-between px-4">
        <div className="flex-1 flex items-center">
          <div className="max-w-xs w-full">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search..."
                type="search"
              />
            </div>
          </div>
        </div>
        
        <div className="ml-4 flex items-center md:ml-6">
          {/* Date range selector */}
          <div className="mr-4 relative" ref={dateRef}>
            <button
              type="button"
              className="flex items-center text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
            >
              <FiCalendar className="mr-2 h-4 w-4 text-gray-500" />
              {dateRange}
              <FiChevronDown className="ml-2 h-4 w-4 text-gray-500" />
            </button>
            
            {dateDropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {dateRanges.map((range) => (
                    <button
                      key={range}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        range === dateRange 
                          ? 'bg-gray-100 text-gray-900' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => handleDateRangeChange(range)}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button 
            className="p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            title="Refresh data"
          >
            <FiRefreshCw className="h-6 w-6" />
          </button>
          
          {/* Notification bell */}
          <button 
            className="p-1 relative text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 ml-3"
            title="Notifications"
          >
            <FiBell className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          {/* Help */}
          <button 
            className="p-1 ml-3 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            title="Help"
          >
            <FiHelpCircle className="h-6 w-6" />
          </button>
          
          {/* Profile dropdown */}
          <div className="ml-3 relative" ref={profileRef}>
            <div>
              <button 
                className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <div className="bg-indigo-200 h-8 w-8 rounded-full flex items-center justify-center">
                  {currentUser?.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt={currentUser.displayName || "User"} 
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <FiUser className="h-5 w-5 text-indigo-800" />
                  )}
                </div>
              </button>
            </div>
            
            {profileDropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <div className="px-4 py-2 text-xs text-gray-500">
                    Signed in as<br />
                    <span className="font-medium text-gray-900">
                      {currentUser?.email || "admin@careerai.com"}
                    </span>
                  </div>
                  
                  <hr className="my-1" />
                  
                  <a
                    href="/admin/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    <div className="flex items-center">
                      <FiUser className="mr-3 h-4 w-4" />
                      Your Profile
                    </div>
                  </a>
                  
                  <a
                    href="/admin/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    <div className="flex items-center">
                      <FiSettings className="mr-3 h-4 w-4" />
                      Settings
                    </div>
                  </a>
                  
                  <hr className="my-1" />
                  
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    <div className="flex items-center">
                      <FiLogOut className="mr-3 h-4 w-4" />
                      Sign out
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTopNav;