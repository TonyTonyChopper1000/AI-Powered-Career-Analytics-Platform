// AdminDashboard.js
import React, { useState } from 'react';
import { 
  FiUsers, 
  FiTrendingUp, 
  FiBarChart2, 
  FiDollarSign, 
  FiActivity,
  FiCalendar,
  FiPieChart,
  FiChevronDown,
  FiSearch,
  FiFilter,
  FiDownload,
  FiRefreshCw,
  FiArrowUp,
  FiArrowDown,
  FiCheckCircle,
  FiAlertCircle,
  FiBell,
  FiSettings,
  FiHelpCircle,
  FiUser,
  FiMessageCircle,
  FiMenu,
  FiX
} from 'react-icons/fi';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState('This Month');
  
  // Sample data for charts
  const userGrowthData = [
    { name: 'Jan', users: 1200 },
    { name: 'Feb', users: 1900 },
    { name: 'Mar', users: 2400 },
    { name: 'Apr', users: 2800 },
    { name: 'May', users: 3300 },
    { name: 'Jun', users: 4100 },
    { name: 'Jul', users: 4800 },
    { name: 'Aug', users: 5300 },
    { name: 'Sep', users: 5900 },
    { name: 'Oct', users: 6400 },
    { name: 'Nov', users: 7000 },
    { name: 'Dec', users: 7800 },
  ];

  const revenueData = [
    { name: 'Jan', revenue: 28000, expenses: 21000 },
    { name: 'Feb', revenue: 35000, expenses: 22000 },
    { name: 'Mar', revenue: 42000, expenses: 24000 },
    { name: 'Apr', revenue: 40000, expenses: 23000 },
    { name: 'May', revenue: 48000, expenses: 25000 },
    { name: 'Jun', revenue: 52000, expenses: 27000 },
    { name: 'Jul', revenue: 58000, expenses: 29000 },
    { name: 'Aug', revenue: 63000, expenses: 30000 },
    { name: 'Sep', revenue: 69000, expenses: 32000 },
    { name: 'Oct', revenue: 75000, expenses: 34000 },
    { name: 'Nov', revenue: 82000, expenses: 36000 },
    { name: 'Dec', revenue: 90000, expenses: 38000 },
  ];
  
  const userDemographicsData = [
    { name: 'IT & Software', value: 35 },
    { name: 'Data Science', value: 25 },
    { name: 'Business', value: 20 },
    { name: 'Design', value: 15 },
    { name: 'Marketing', value: 5 },
  ];
  
  const userActivityData = [
    { name: 'Mon', mentorSessions: 145, careerAssessments: 85, resumeUploads: 42 },
    { name: 'Tue', mentorSessions: 132, careerAssessments: 97, resumeUploads: 38 },
    { name: 'Wed', mentorSessions: 156, careerAssessments: 105, resumeUploads: 51 },
    { name: 'Thu', mentorSessions: 142, careerAssessments: 92, resumeUploads: 45 },
    { name: 'Fri', mentorSessions: 138, careerAssessments: 88, resumeUploads: 36 },
    { name: 'Sat', mentorSessions: 95, careerAssessments: 60, resumeUploads: 25 },
    { name: 'Sun', mentorSessions: 82, careerAssessments: 55, resumeUploads: 22 },
  ];

  const retentionData = [
    { name: 'Week 1', rate: 100 },
    { name: 'Week 2', rate: 92 },
    { name: 'Week 3', rate: 85 },
    { name: 'Week 4', rate: 80 },
    { name: 'Week 5', rate: 76 },
    { name: 'Week 6', rate: 73 },
    { name: 'Week 7', rate: 71 },
    { name: 'Week 8', rate: 70 },
  ];
  
  const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#F97316', '#10B981'];
  
  const kpiCards = [
    {
      title: "Total Users",
      value: "7,842",
      change: "+12.5%",
      isPositive: true,
      icon: <FiUsers className="h-6 w-6 text-indigo-500" />,
      description: "vs. previous month"
    },
    {
      title: "Monthly Revenue",
      value: "$89,320",
      change: "+8.2%",
      isPositive: true,
      icon: <FiDollarSign className="h-6 w-6 text-green-500" />,
      description: "vs. previous month"
    },
    {
      title: "Active Mentors",
      value: "324",
      change: "+5.1%",
      isPositive: true,
      icon: <FiActivity className="h-6 w-6 text-purple-500" />,
      description: "vs. previous month"
    },
    {
      title: "User Retention",
      value: "76.2%",
      change: "-2.3%",
      isPositive: false,
      icon: <FiBarChart2 className="h-6 w-6 text-orange-500" />,
      description: "vs. previous month"
    }
  ];
  
  const recentAlerts = [
    {
      type: "warning",
      message: "User retention dropped below 80% this week",
      time: "2 hours ago"
    },
    {
      type: "success",
      message: "Monthly revenue target achieved",
      time: "5 hours ago"
    },
    {
      type: "info",
      message: "25 new mentor applications received",
      time: "1 day ago"
    },
    {
      type: "error",
      message: "Payment gateway reporting delays",
      time: "2 days ago"
    }
  ];
  
  const topPerformingCourses = [
    {
      name: "Advanced Machine Learning",
      enrollments: 1245,
      rating: 4.8,
      revenue: "$35,620"
    },
    {
      name: "Data Science Bootcamp",
      enrollments: 1120,
      rating: 4.7,
      revenue: "$31,990"
    },
    {
      name: "Cloud Computing Essentials",
      enrollments: 985,
      rating: 4.6,
      revenue: "$28,540"
    },
    {
      name: "Full Stack Development",
      enrollments: 925,
      rating: 4.7,
      revenue: "$26,780"
    },
    {
      name: "UI/UX Design Masterclass",
      enrollments: 890,
      rating: 4.9,
      revenue: "$25,345"
    }
  ];
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-indigo-900">
          <div className="flex items-center h-16 px-4 bg-indigo-800">
            <div className="flex items-center text-white text-xl font-bold">
              <FiBarChart2 className="mr-2 h-6 w-6" />
              <span>CareerAI Admin</span>
            </div>
          </div>
          <div className="flex flex-col flex-grow overflow-y-auto">
            <nav className="flex-1 px-2 py-4 space-y-1">
              <a href="#" className="flex items-center px-4 py-3 text-sm font-medium text-white bg-indigo-800 rounded-md">
                <FiBarChart2 className="mr-3 h-5 w-5" />
                Dashboard
              </a>
              <a href="#" className="flex items-center px-4 py-3 text-sm font-medium text-indigo-100 hover:bg-indigo-800 rounded-md">
                <FiUsers className="mr-3 h-5 w-5" />
                Users
              </a>
              <a href="#" className="flex items-center px-4 py-3 text-sm font-medium text-indigo-100 hover:bg-indigo-800 rounded-md">
                <FiMessageCircle className="mr-3 h-5 w-5" />
                Mentors
              </a>
              <a href="#" className="flex items-center px-4 py-3 text-sm font-medium text-indigo-100 hover:bg-indigo-800 rounded-md">
                <FiDollarSign className="mr-3 h-5 w-5" />
                Billing
              </a>
              <a href="#" className="flex items-center px-4 py-3 text-sm font-medium text-indigo-100 hover:bg-indigo-800 rounded-md">
                <FiCalendar className="mr-3 h-5 w-5" />
                Courses
              </a>
              <a href="#" className="flex items-center px-4 py-3 text-sm font-medium text-indigo-100 hover:bg-indigo-800 rounded-md">
                <FiActivity className="mr-3 h-5 w-5" />
                Reports
              </a>
              <a href="#" className="flex items-center px-4 py-3 text-sm font-medium text-indigo-100 hover:bg-indigo-800 rounded-md">
                <FiSettings className="mr-3 h-5 w-5" />
                Settings
              </a>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-indigo-800 p-4">
            <div className="flex items-center">
              <div className="bg-indigo-200 h-10 w-10 rounded-full flex items-center justify-center">
                <FiUser className="h-6 w-6 text-indigo-800" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-indigo-300">admin@careerai.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex flex-col w-full max-w-xs bg-indigo-900">
            <div className="absolute top-0 right-0 pt-2 pr-2">
              <button
                className="text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            <div className="flex items-center h-16 px-4 bg-indigo-800">
              <div className="flex items-center text-white text-xl font-bold">
                <FiBarChart2 className="mr-2 h-6 w-6" />
                <span>CareerAI Admin</span>
              </div>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <nav className="flex-1 px-2 space-y-1">
                <a href="#" className="flex items-center px-4 py-3 text-sm font-medium text-white bg-indigo-800 rounded-md">
                  <FiBarChart2 className="mr-3 h-5 w-5" />
                  Dashboard
                </a>
                <a href="#" className="flex items-center px-4 py-3 text-sm font-medium text-indigo-100 hover:bg-indigo-800 rounded-md">
                  <FiUsers className="mr-3 h-5 w-5" />
                  Users
                </a>
                <a href="#" className="flex items-center px-4 py-3 text-sm font-medium text-indigo-100 hover:bg-indigo-800 rounded-md">
                  <FiMessageCircle className="mr-3 h-5 w-5" />
                  Mentors
                </a>
                <a href="#" className="flex items-center px-4 py-3 text-sm font-medium text-indigo-100 hover:bg-indigo-800 rounded-md">
                  <FiDollarSign className="mr-3 h-5 w-5" />
                  Billing
                </a>
                <a href="#" className="flex items-center px-4 py-3 text-sm font-medium text-indigo-100 hover:bg-indigo-800 rounded-md">
                  <FiCalendar className="mr-3 h-5 w-5" />
                  Courses
                </a>
                <a href="#" className="flex items-center px-4 py-3 text-sm font-medium text-indigo-100 hover:bg-indigo-800 rounded-md">
                  <FiActivity className="mr-3 h-5 w-5" />
                  Reports
                </a>
                <a href="#" className="flex items-center px-4 py-3 text-sm font-medium text-indigo-100 hover:bg-indigo-800 rounded-md">
                  <FiSettings className="mr-3 h-5 w-5" />
                  Settings
                </a>
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-indigo-800 p-4">
              <div className="flex items-center">
                <div className="bg-indigo-200 h-10 w-10 rounded-full flex items-center justify-center">
                  <FiUser className="h-6 w-6 text-indigo-800" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">Admin User</p>
                  <p className="text-xs text-indigo-300">admin@careerai.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navbar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            className="md:hidden px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
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
              <div className="mr-4">
                <div className="relative">
                  <button
                    type="button"
                    className="flex items-center text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <FiCalendar className="mr-2 h-4 w-4 text-gray-500" />
                    {dateRange}
                    <FiChevronDown className="ml-2 h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
              
              <button className="p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <FiRefreshCw className="h-6 w-6" />
              </button>
              
              {/* Notification bell */}
              <button className="p-1 relative text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <FiBell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              {/* Help */}
              <button className="p-1 ml-2 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <FiHelpCircle className="h-6 w-6" />
              </button>
              
              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <div>
                  <button className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <div className="bg-indigo-200 h-8 w-8 rounded-full flex items-center justify-center">
                      <FiUser className="h-5 w-5 text-indigo-800" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main dashboard content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard header */}
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
              <p className="mt-1 text-sm text-gray-500">Get insights into your platform performance</p>
            </div>
            
            {/* KPI Cards */}
            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {kpiCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="bg-indigo-50 rounded-full p-3">
                          {card.icon}
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            {card.title}
                          </dt>
                          <dd>
                            <div className="text-xl font-bold text-gray-900">
                              {card.value}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm flex items-center">
                      {card.isPositive ? (
                        <FiArrowUp className="mr-1 h-4 w-4 text-green-500" />
                      ) : (
                        <FiArrowDown className="mr-1 h-4 w-4 text-red-500" />
                      )}
                      <span className={card.isPositive ? "text-green-500" : "text-red-500"}>
                        {card.change}
                      </span>
                      <span className="text-gray-500 ml-2">
                        {card.description}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
              {/* User Growth Chart */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">User Growth</h2>
                  <button className="text-sm text-indigo-600 hover:text-indigo-500 focus:outline-none">
                    <FiDownload className="h-5 w-5" />
                  </button>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={userGrowthData}
                      margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="users"
                        stroke="#6366f1"
                        fill="#818cf8"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Revenue Chart */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Revenue & Expenses</h2>
                  <button className="text-sm text-indigo-600 hover:text-indigo-500 focus:outline-none">
                    <FiDownload className="h-5 w-5" />
                  </button>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={revenueData}
                      margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" fill="#6366f1" name="Revenue" />
                      <Bar dataKey="expenses" fill="#f87171" name="Expenses" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* User Demographics Chart */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">User Demographics</h2>
                  <button className="text-sm text-indigo-600 hover:text-indigo-500 focus:outline-none">
                    <FiDownload className="h-5 w-5" />
                  </button>
                </div>
                <div className="h-72 flex items-center justify-center">
                  <div className="h-72 w-full max-w-md">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={userDemographicsData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                        >
                          {userDemographicsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              {/* User Activity Chart */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">Weekly User Activity</h2>
                  <button className="text-sm text-indigo-600 hover:text-indigo-500 focus:outline-none">
                    <FiDownload className="h-5 w-5" />
                  </button>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={userActivityData}
                      margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="mentorSessions" fill="#6366f1" name="Mentor Sessions" />
                      <Bar dataKey="careerAssessments" fill="#8b5cf6" name="Career Assessments" />
                      <Bar dataKey="resumeUploads" fill="#ec4899" name="Resume Uploads" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* User Retention Chart */}
              <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">User Retention</h2>
                  <button className="text-sm text-indigo-600 hover:text-indigo-500 focus:outline-none">
                    <FiDownload className="h-5 w-5" />
                  </button>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={retentionData}
                      margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[50, 100]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="#6366f1"
                        strokeWidth={2}
                        dot={{ r: 5 }}
                        activeDot={{ r: 7 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            {/* Additional Widgets */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Recent Alerts */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Recent Alerts</h3>
                </div>
                <div className="px-6 py-4">
                  <ul className="divide-y divide-gray-200">
                    {recentAlerts.map((alert, index) => (
                      <li key={index} className="py-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            {alert.type === "success" && (
                              <FiCheckCircle className="h-5 w-5 text-green-500" />
                            )}
                            {alert.type === "warning" && (
                              <FiAlertCircle className="h-5 w-5 text-yellow-500" />
                            )}
                            {alert.type === "error" && (
                              <FiAlertCircle className="h-5 w-5 text-red-500" />
                            )}
                             {alert.type === "info" && (
                              <FiAlertCircle className="h-5 w-5 text-blue-500" />
                            )}
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm text-gray-800">{alert.message}</p>
                            <p className="mt-1 text-xs text-gray-500">{alert.time}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 text-center">
                    <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                      View All Alerts
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Top Performing Courses */}
              <div className="bg-white rounded-lg shadow lg:col-span-2">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Top Performing Courses</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Course Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Enrollments
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rating
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {topPerformingCourses.map((course, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{course.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{course.enrollments}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              <span className="text-yellow-500">★</span> {course.rating}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {course.revenue}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 border-t border-gray-200">
                  <div className="text-center">
                    <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                      View All Courses
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Actions Card */}
            <div className="mt-8 bg-white rounded-lg shadow">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="px-6 py-5">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  <a
                    href="#"
                    className="col-span-1 flex flex-col items-center justify-center p-5 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                  >
                    <FiUsers className="h-8 w-8 text-indigo-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Add User</span>
                  </a>
                  <a
                    href="#"
                    className="col-span-1 flex flex-col items-center justify-center p-5 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                  >
                    <FiCalendar className="h-8 w-8 text-indigo-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">New Course</span>
                  </a>
                  <a
                    href="#"
                    className="col-span-1 flex flex-col items-center justify-center p-5 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                  >
                    <FiMessageCircle className="h-8 w-8 text-indigo-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Mentor</span>
                  </a>
                  <a
                    href="#"
                    className="col-span-1 flex flex-col items-center justify-center p-5 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                  >
                    <FiBarChart2 className="h-8 w-8 text-indigo-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Reports</span>
                  </a>
                  <a
                    href="#"
                    className="col-span-1 flex flex-col items-center justify-center p-5 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                  >
                    <FiDollarSign className="h-8 w-8 text-indigo-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Billing</span>
                  </a>
                  <a
                    href="#"
                    className="col-span-1 flex flex-col items-center justify-center p-5 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                  >
                    <FiSettings className="h-8 w-8 text-indigo-600 mb-2" />
                    <span className="text-sm font-medium text-gray-900">Settings</span>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Recent Activity Feed */}
            <div className="mt-8 bg-white rounded-lg shadow">
              <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                <div>
                  <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                    <FiFilter className="mr-2 h-4 w-4" />
                    Filter
                  </button>
                </div>
              </div>
              <div className="px-6 py-4">
                <div className="flow-root">
                  <ul className="-mb-8">
                    <li>
                      <div className="relative pb-8">
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
                              <FiUser className="h-5 w-5 text-white" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-800">
                                <span className="font-medium text-gray-900">Alex Johnson</span> registered a new account
                              </p>
                            </div>
                            <div className="text-sm text-gray-500">
                              <time dateTime="2025-03-12T13:05:00">10 minutes ago</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative pb-8">
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                              <FiDollarSign className="h-5 w-5 text-white" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-800">
                                <span className="font-medium text-gray-900">Maria Garcia</span> upgraded to premium plan
                              </p>
                            </div>
                            <div className="text-sm text-gray-500">
                              <time dateTime="2025-03-12T11:30:00">1 hour ago</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative pb-8">
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                              <FiMessageCircle className="h-5 w-5 text-white" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-800">
                                <span className="font-medium text-gray-900">David Kim</span> scheduled a mentorship session with <span className="font-medium text-gray-900">Sarah Johnson</span>
                              </p>
                            </div>
                            <div className="text-sm text-gray-500">
                              <time dateTime="2025-03-12T09:15:00">3 hours ago</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative pb-8">
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
                              <FiBarChart2 className="h-5 w-5 text-white" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-800">
                                <span className="font-medium text-gray-900">Monthly Revenue Report</span> is now available
                              </p>
                            </div>
                            <div className="text-sm text-gray-500">
                              <time dateTime="2025-03-12T06:00:00">6 hours ago</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative">
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center">
                              <FiCalendar className="h-5 w-5 text-white" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-800">
                                <span className="font-medium text-gray-900">Advanced Machine Learning</span> course was published by <span className="font-medium text-gray-900">Dr. Lisa Thompson</span>
                              </p>
                            </div>
                            <div className="text-sm text-gray-500">
                              <time dateTime="2025-03-11T18:45:00">Yesterday</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 text-center">
                  <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                    View All Activity
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;