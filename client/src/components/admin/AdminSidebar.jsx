// src/components/admin/AdminSidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiBarChart2, 
  FiUsers, 
  FiMessageCircle, 
  FiDollarSign, 
  FiCalendar, 
  FiActivity, 
  FiSettings,
  FiUser,
  FiX
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const AdminSidebar = ({ mobile = false, onClose = () => {} }) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <div className={`flex flex-col ${mobile ? 'w-full max-w-xs' : 'w-64'} bg-indigo-900`}>
      {mobile && (
        <div className="absolute top-0 right-0 pt-2 pr-2">
          <button
            className="text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={onClose}
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>
      )}
      
      <div className="flex items-center h-16 px-4 bg-indigo-800">
        <div className="flex items-center text-white text-xl font-bold">
          <FiBarChart2 className="mr-2 h-6 w-6" />
          <span>CareerAI Admin</span>
        </div>
      </div>
      
      <div className={`flex flex-col flex-grow overflow-y-auto ${mobile ? 'h-0 pt-5 pb-4' : ''}`}>
        <nav className="flex-1 px-2 py-4 space-y-1">
          <Link 
            to="/admin/dashboard" 
            className={`flex items-center px-4 py-3 text-sm font-medium ${
              isActive('/admin/dashboard') 
                ? 'text-white bg-indigo-800' 
                : 'text-indigo-100 hover:bg-indigo-800'
            } rounded-md`}
          >
            <FiBarChart2 className="mr-3 h-5 w-5" />
            Dashboard
          </Link>
          
          <Link 
            to="/admin/users" 
            className={`flex items-center px-4 py-3 text-sm font-medium ${
              isActive('/admin/users') 
                ? 'text-white bg-indigo-800' 
                : 'text-indigo-100 hover:bg-indigo-800'
            } rounded-md`}
          >
            <FiUsers className="mr-3 h-5 w-5" />
            Users
          </Link>
          
          <Link 
            to="/admin/mentors" 
            className={`flex items-center px-4 py-3 text-sm font-medium ${
              isActive('/admin/mentors') 
                ? 'text-white bg-indigo-800' 
                : 'text-indigo-100 hover:bg-indigo-800'
            } rounded-md`}
          >
            <FiMessageCircle className="mr-3 h-5 w-5" />
            Mentors
          </Link>
          
          <Link 
            to="/admin/billing" 
            className={`flex items-center px-4 py-3 text-sm font-medium ${
              isActive('/admin/billing') 
                ? 'text-white bg-indigo-800' 
                : 'text-indigo-100 hover:bg-indigo-800'
            } rounded-md`}
          >
            <FiDollarSign className="mr-3 h-5 w-5" />
            Billing
          </Link>
          
          <Link 
            to="/admin/courses" 
            className={`flex items-center px-4 py-3 text-sm font-medium ${
              isActive('/admin/courses') 
                ? 'text-white bg-indigo-800' 
                : 'text-indigo-100 hover:bg-indigo-800'
            } rounded-md`}
          >
            <FiCalendar className="mr-3 h-5 w-5" />
            Courses
          </Link>
          
          <Link 
            to="/admin/reports" 
            className={`flex items-center px-4 py-3 text-sm font-medium ${
              isActive('/admin/reports') 
                ? 'text-white bg-indigo-800' 
                : 'text-indigo-100 hover:bg-indigo-800'
            } rounded-md`}
          >
            <FiActivity className="mr-3 h-5 w-5" />
            Reports
          </Link>
          
          <Link 
            to="/admin/settings" 
            className={`flex items-center px-4 py-3 text-sm font-medium ${
              isActive('/admin/settings') 
                ? 'text-white bg-indigo-800' 
                : 'text-indigo-100 hover:bg-indigo-800'
            } rounded-md`}
          >
            <FiSettings className="mr-3 h-5 w-5" />
            Settings
          </Link>
        </nav>
      </div>
      
      <div className="flex-shrink-0 flex border-t border-indigo-800 p-4">
        <div className="flex items-center">
          <div className="bg-indigo-200 h-10 w-10 rounded-full flex items-center justify-center">
            <FiUser className="h-6 w-6 text-indigo-800" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">
              {currentUser?.displayName || 'Admin User'}
            </p>
            <p className="text-xs text-indigo-300">
              {currentUser?.email || 'admin@careerai.com'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;