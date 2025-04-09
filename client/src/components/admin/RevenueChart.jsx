// src/components/admin/charts/RevenueChart.jsx
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

const RevenueChart = ({ data }) => {
  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900">Revenue & Expenses</h2>
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
      'Month,Revenue,Expenses\n' + 
      data.map(item => `${item.name},${item.revenue},${item.expenses}`).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'revenue_expense_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Revenue & Expenses</h2>
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
              tickFormatter={value => `$${value / 1000}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: '0.375rem',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}
              formatter={(value) => [formatCurrency(value), '']}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend />
            <Bar 
              dataKey="revenue" 
              fill="#6366f1" 
              name="Revenue" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="expenses" 
              fill="#f87171" 
              name="Expenses" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;