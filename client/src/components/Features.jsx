import React from 'react';
import { 
  FiTrendingUp, 
  FiTarget, 
  FiPieChart, 
  FiCalendar, 
  FiMessageCircle, 
  FiCheckCircle,
  FiBarChart2
} from 'react-icons/fi';

const FeatureItem = ({ icon, title, description }) => {
  return (
    <div className="flex items-start">
      <div className="bg-indigo-700/50 rounded-full p-2 mr-4 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-indigo-200">{description}</p>
      </div>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <FiBarChart2 className="h-5 w-5 text-indigo-300" />,
      title: "AI-Powered Analytics",
      description: "Get deep insights into market trends, skills valuation, and career opportunities using advanced machine learning."
    },
    {
      icon: <FiTarget className="h-5 w-5 text-indigo-300" />,
      title: "Skill Gap Identification",
      description: "Precisely identify which skills you need to develop to reach your target roles or salary goals."
    },
    {
      icon: <FiTrendingUp className="h-5 w-5 text-indigo-300" />,
      title: "Salary Benchmarking",
      description: "Compare your compensation to industry standards with location-specific data and skill-based adjustments."
    },
    {
      icon: <FiPieChart className="h-5 w-5 text-indigo-300" />,
      title: "Learning Recommendations",
      description: "Receive custom course suggestions and educational resources based on your skill gaps."
    },
    {
      icon: <FiCalendar className="h-5 w-5 text-indigo-300" />,
      title: "Goal Tracking",
      description: "Set career objectives and track your progress with scheduled milestone monitoring."
    },
    {
      icon: <FiMessageCircle className="h-5 w-5 text-indigo-300" />,
      title: "Career Assistant Bot",
      description: "Get instant answers to career questions using our specialized AI chatbot."
    }
  ];

  return (
    <section id="features" className="bg-gradient-to-b from-indigo-800 to-indigo-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Advanced Career Analytics</h2>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
            Our platform uses artificial intelligence to provide data-driven insights that help you make smarter career decisions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {features.map((feature, index) => (
            <FeatureItem 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
        
        <div className="mt-16 pt-8 border-t border-indigo-800/50 text-center">
          <div className="inline-flex flex-col items-center">
            <div className="flex space-x-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <FiCheckCircle key={i} className="h-5 w-5 text-green-400" />
              ))}
            </div>
            <p className="text-indigo-200 max-w-2xl">
              <span className="font-semibold text-white">CareerAI</span> is trusted by over 10,000 professionals from leading companies including Google, Amazon, Microsoft, and hundreds of startups.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;