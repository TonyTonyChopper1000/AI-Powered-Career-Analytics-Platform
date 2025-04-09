// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import AdminSidebar from '../components/admin/AdminSidebar.jsx';
import AdminTopNav from '../components/admin/AdminTopNav.jsx';
import KpiCards from '../components/admin/KpiCards.jsx';
import UserGrowthChart from '../components/admin/charts/UserGrowthChart.jsx';
import RevenueChart from '../components/admin/charts/RevenueChart.jsx';
import UserDemographicsChart from '../components/admin/charts/UserDemographicsChart.jsx';
import UserActivityChart from '../components/admin/charts/UserActivityChart.jsx';
import UserRetentionChart from '../components/admin/charts/UserRetentionChart.jsx';
import RecentAlerts from '../components/admin/RecentAlerts.jsx';
import TopPerformingCourses from '../components/admin/TopPerformingCourses.jsx';
import QuickActions from '../components/admin/QuickActions.jsx';
import ActivityFeed from '../components/admin/ActivityFeed.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState('This Month');
  const { currentUser } = useAuth();
  
  // Sample data for all charts and components comes from our data service
  const [dashboardData, setDashboardData] = useState({
    userGrowthData: [],
    revenueData: [],
    userDemographicsData: [],
    userActivityData: [],
    retentionData: [],
    kpiCards: [],
    recentAlerts: [],
    topPerformingCourses: []
  });
  
  useEffect(() => {
    // In a real application, you would fetch this data from your backend
    // For demonstration purposes, we're using mock data
    
    const mockData = {
      userGrowthData: [
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
      ],
      revenueData: [
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
      ],
      userDemographicsData: [
        { name: 'IT & Software', value: 35 },
        { name: 'Data Science', value: 25 },
        { name: 'Business', value: 20 },
        { name: 'Design', value: 15 },
        { name: 'Marketing', value: 5 },
      ],
      userActivityData: [
        { name: 'Mon', mentorSessions: 145, careerAssessments: 85, resumeUploads: 42 },
        { name: 'Tue', mentorSessions: 132, careerAssessments: 97, resumeUploads: 38 },
        { name: 'Wed', mentorSessions: 156, careerAssessments: 105, resumeUploads: 51 },
        { name: 'Thu', mentorSessions: 142, careerAssessments: 92, resumeUploads: 45 },
        { name: 'Fri', mentorSessions: 138, careerAssessments: 88, resumeUploads: 36 },
        { name: 'Sat', mentorSessions: 95, careerAssessments: 60, resumeUploads: 25 },
        { name: 'Sun', mentorSessions: 82, careerAssessments: 55, resumeUploads: 22 },
      ],
      retentionData: [
        { name: 'Week 1', rate: 100 },
        { name: 'Week 2', rate: 92 },
        { name: 'Week 3', rate: 85 },
        { name: 'Week 4', rate: 80 },
        { name: 'Week 5', rate: 76 },
        { name: 'Week 6', rate: 73 },
        { name: 'Week 7', rate: 71 },
        { name: 'Week 8', rate: 70 },
      ],
      kpiCards: [
        {
          title: "Total Users",
          value: "7,842",
          change: "+12.5%",
          isPositive: true,
          icon: "users",
          description: "vs. previous month"
        },
        {
          title: "Monthly Revenue",
          value: "$89,320",
          change: "+8.2%",
          isPositive: true,
          icon: "dollar",
          description: "vs. previous month"
        },
        {
          title: "Active Mentors",
          value: "324",
          change: "+5.1%",
          isPositive: true,
          icon: "activity",
          description: "vs. previous month"
        },
        {
          title: "User Retention",
          value: "76.2%",
          change: "-2.3%",
          isPositive: false,
          icon: "bar-chart",
          description: "vs. previous month"
        }
      ],
      recentAlerts: [
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
      ],
      topPerformingCourses: [
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
      ]
    };
    
    setDashboardData(mockData);
  }, []);
  
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar for larger screens */}
        <div className="hidden md:flex md:flex-shrink-0">
          <AdminSidebar />
        </div>
        
        {/* Mobile sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
            <AdminSidebar mobile={true} onClose={() => setSidebarOpen(false)} />
          </div>
        )}
        
        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Top navbar */}
          <AdminTopNav 
            onMenuToggle={() => setSidebarOpen(true)} 
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
          
          {/* Main dashboard content */}
          <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
              {/* Dashboard header */}
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
                <p className="mt-1 text-sm text-gray-500">Get insights into your platform performance</p>
              </div>
              
              {/* KPI Cards */}
              <KpiCards kpiCards={dashboardData.kpiCards} />
              
              {/* Charts Section */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
                {/* User Growth Chart */}
                <UserGrowthChart data={dashboardData.userGrowthData} />
                
                {/* Revenue Chart */}
                <RevenueChart data={dashboardData.revenueData} />
                
                {/* User Demographics Chart */}
                <UserDemographicsChart data={dashboardData.userDemographicsData} />
                
                {/* User Activity Chart */}
                <UserActivityChart data={dashboardData.userActivityData} />
                
                {/* User Retention Chart */}
                <UserRetentionChart 
                  data={dashboardData.retentionData} 
                  className="lg:col-span-2"
                />
              </div>
              
              {/* Additional Widgets */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Recent Alerts */}
                <RecentAlerts alerts={dashboardData.recentAlerts} />
                
                {/* Top Performing Courses */}
                <TopPerformingCourses 
                  courses={dashboardData.topPerformingCourses} 
                  className="lg:col-span-2"
                />
              </div>
              
              {/* Quick Actions Card */}
              <QuickActions />
              
              {/* Recent Activity Feed */}
              <ActivityFeed />
            </div>
          </main>
          
          <Footer />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;