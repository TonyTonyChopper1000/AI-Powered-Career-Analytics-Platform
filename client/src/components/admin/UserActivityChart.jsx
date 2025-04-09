// src/components/admin/charts/UserActivityChart.jsx
import React from 'react';
import { FiDownload } from 'react-icons/fi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const UserActivityChart = ({ data }) => {
  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900">Weekly User Activity</h2>
        <div className="h-72 flex items-center justify-center">
          <p className="text-gray-500">No data available</p>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    // Functionality to download chart data
    const csvContent = 
      'data:text/csv;charset=utf-8,' + 
      'Day,Mentor Sessions,Career Assessments,Resume Uploads\n' + 
      data.map(item => `${item.name},${item.mentorSessions},${item.careerAssessments},${item.resumeUploads}`).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'weekly_user_activity_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Weekly User Activity</h2>
        <button 
          className="text-sm text-indigo-600 hover:text-indigo-500 focus:outline-none"
          onClick={handleDownload}
          title="Download CSV"
        >
          <FiDownload className="h-5 w-5" />
        </button>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#E5E7EB' }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: '0.375rem',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}
            />
            <Legend />
            <Bar 
              dataKey="mentorSessions" 
              fill="#6366f1" 
              name="Mentor Sessions" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="careerAssessments" 
              fill="#8b5cf6" 
              name="Career Assessments" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="resumeUploads" 
              fill="#ec4899" 
              name="Resume Uploads" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserActivityChart;