import React from 'react';
import { 
  FiBriefcase, 
  FiTrendingUp, 
  FiTarget, 
  FiCompass, 
  FiDatabase, 
  FiUsers,
  FiArrowRight
} from 'react-icons/fi';

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="bg-indigo-800/30 backdrop-blur-sm border border-indigo-700/30 rounded-xl p-6 transition-all hover:bg-indigo-800/40 hover:border-indigo-600/50 hover:shadow-lg">
      <div className="bg-indigo-700/50 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-indigo-200 mb-4">{description}</p>
      <a href="#" className="text-indigo-300 hover:text-white font-medium inline-flex items-center transition-colors">
        Learn more <FiArrowRight className="ml-2" />
      </a>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      icon: <FiBriefcase className="h-6 w-6 text-white" />,
      title: "Career Path Analysis",
      description: "Get personalized career roadmaps based on your skills, experience, and goals with advanced ML algorithms."
    },
    {
      icon: <FiTrendingUp className="h-6 w-6 text-white" />,
      title: "Salary Prediction",
      description: "Accurate salary forecasting based on your skills, location, and market demand to help with negotiations."
    },
    {
      icon: <FiTarget className="h-6 w-6 text-white" />,
      title: "Skill Gap Analysis",
      description: "Identify critical skills you need to develop for your target roles and get personalized learning paths."
    },
    {
      icon: <FiCompass className="h-6 w-6 text-white" />,
      title: "Mentor Matching",
      description: "Connect with industry mentors matched to your specific career goals and learning preferences."
    },
    {
      icon: <FiDatabase className="h-6 w-6 text-white" />,
      title: "Resume Optimization",
      description: "AI-powered resume scoring and suggestions to help you stand out to recruiters and ATS systems."
    },
    {
      icon: <FiUsers className="h-6 w-6 text-white" />,
      title: "Networking Recommendations",
      description: "Discover valuable professional connections based on your career goals and industry focus."
    }
  ];

  return (
    <section id="services" className="bg-gradient-to-b from-indigo-900 to-indigo-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">AI-Powered Career Services</h2>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
            Our platform offers a suite of advanced tools to analyze your career data, identify opportunities, and accelerate your professional growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a href="#" className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-colors">
            Explore All Services <FiArrowRight className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;    