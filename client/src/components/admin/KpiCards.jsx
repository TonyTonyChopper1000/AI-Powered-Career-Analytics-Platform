// src/components/admin/KpiCards.jsx
import React from 'react';
import { 
  FiUsers, 
  FiDollarSign, 
  FiActivity, 
  FiBarChart2,
  FiArrowUp,
  FiArrowDown
} from 'react-icons/fi';

const KpiCards = ({ kpiCards }) => {
  // If no data is provided, use default cards
  const cards = kpiCards || [
    {
      title: "Total Users",
      value: "0",
      change: "0%",
      isPositive: true,
      icon: "users",
      description: "vs. previous month"
    },
    {
      title: "Monthly Revenue",
      value: "$0",
      change: "0%",
      isPositive: true,
      icon: "dollar",
      description: "vs. previous month"
    },
    {
      title: "Active Mentors",
      value: "0",
      change: "0%",
      isPositive: true,
      icon: "activity",
      description: "vs. previous month"
    },
    {
      title: "User Retention",
      value: "0%",
      change: "0%",
      isPositive: true,
      icon: "bar-chart",
      description: "vs. previous month"
    }
  ];

  // Function to get the appropriate icon component
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'users':
        return <FiUsers className="h-6 w-6 text-indigo-500" />;
      case 'dollar':
        return <FiDollarSign className="h-6 w-6 text-green-500" />;
      case 'activity':
        return <FiActivity className="h-6 w-6 text-purple-500" />;
      case 'bar-chart':
        return <FiBarChart2 className="h-6 w-6 text-orange-500" />;
      default:
        return <FiActivity className="h-6 w-6 text-indigo-500" />;
    }
  };
  
  return (
    <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-indigo-50 rounded-full p-3">
                  {getIcon(card.icon)}
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
  );
};

export default KpiCards;