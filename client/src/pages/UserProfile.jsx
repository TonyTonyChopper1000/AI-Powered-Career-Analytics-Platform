// UserProfile.js
import React, { useState } from 'react';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiLinkedin, 
  FiTwitter, 
  FiGithub, 
  FiEdit2, 
  FiPlus,
  FiTrash2,
  FiCheck,
  FiX,
  FiChevronDown,
  FiFileText,
  FiStar,
  FiBarChart2,
  FiTrendingUp,
  FiAward,
  FiBookmark,
  FiSettings,
  FiClock,
  FiCalendar,
  FiCamera
} from 'react-icons/fi';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(85);
  
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    title: "Senior Data Scientist",
    company: "TechInsights Inc.",
    location: "San Francisco, CA",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    about: "Experienced data scientist with 7+ years of expertise in machine learning, AI, and big data analytics. Passionate about leveraging data-driven insights to solve complex business problems and drive strategic decision-making.",
    education: [
      {
        degree: "Ph.D. in Computer Science",
        institution: "Stanford University",
        year: "2016-2020"
      },
      {
        degree: "M.S. in Data Science",
        institution: "University of California, Berkeley",
        year: "2014-2016"
      },
      {
        degree: "B.S. in Mathematics",
        institution: "MIT",
        year: "2010-2014"
      }
    ],
    experience: [
      {
        role: "Senior Data Scientist",
        company: "TechInsights Inc.",
        duration: "2020 - Present",
        description: "Lead a team of data scientists in developing and implementing advanced machine learning models for predictive analytics. Successfully increased company revenue by 23% through targeted customer recommendations."
      },
      {
        role: "Data Scientist",
        company: "InnovateAI",
        duration: "2016 - 2020",
        description: "Developed natural language processing algorithms for sentiment analysis and customer feedback categorization. Reduced manual data processing time by 85%."
      },
      {
        role: "Machine Learning Intern",
        company: "Google",
        duration: "Summer 2015",
        description: "Collaborated with the research team to enhance computer vision algorithms for object recognition. Published research paper in a top-tier conference."
      }
    ],
    skills: [
      { name: "Python", level: 95 },
      { name: "Machine Learning", level: 90 },
      { name: "Data Analysis", level: 92 },
      { name: "Deep Learning", level: 85 },
      { name: "SQL", level: 88 },
      { name: "Big Data (Hadoop/Spark)", level: 80 },
      { name: "Natural Language Processing", level: 85 },
      { name: "Cloud Computing (AWS)", level: 78 }
    ],
    certifications: [
      {
        name: "AWS Certified Machine Learning - Specialty",
        issuer: "Amazon Web Services",
        year: "2022"
      },
      {
        name: "TensorFlow Developer Certificate",
        issuer: "Google",
        year: "2021"
      },
      {
        name: "Professional Data Scientist",
        issuer: "IBM",
        year: "2020"
      }
    ],
    languages: [
      { name: "English", proficiency: "Native" },
      { name: "Spanish", proficiency: "Professional" },
      { name: "French", proficiency: "Intermediate" }
    ],
    projectsCompleted: 42,
    recommendations: 15,
    connections: 524,
    socialLinks: {
      linkedin: "linkedin.com/in/alexjohnson",
      twitter: "twitter.com/alexjdata",
      github: "github.com/alexjohnson"
    }
  });
  
  const careerStats = [
    {
      name: "Skills Match",
      value: "92%",
      description: "Your skills match top Data Science jobs",
      icon: <FiBarChart2 className="h-5 w-5 text-indigo-400" />,
      trend: "+5%",
      trendUp: true
    },
    {
      name: "Market Value",
      value: "$125,000",
      description: "Estimated annual salary range",
      icon: <FiTrendingUp className="h-5 w-5 text-indigo-400" />,
      trend: "+8%",
      trendUp: true
    },
    {
      name: "Top Skill",
      value: "Python",
      description: "Based on industry demand and your proficiency",
      icon: <FiStar className="h-5 w-5 text-indigo-400" />,
      trend: "High Demand",
      trendUp: true
    },
    {
      name: "Growth Potential",
      value: "High",
      description: "Career advancement opportunity in your field",
      icon: <FiAward className="h-5 w-5 text-indigo-400" />,
      trend: "Expanding",
      trendUp: true
    }
  ];
  
  const upcomingActions = [
    {
      title: "Complete Python Advanced Course",
      type: "Course",
      dueDate: "March 20, 2025",
      progress: 65
    },
    {
      title: "Update Resume with Recent Projects",
      type: "Career",
      dueDate: "March 15, 2025",
      progress: 30
    },
    {
      title: "Connect with 5 Industry Leaders",
      type: "Networking",
      dueDate: "March 25, 2025",
      progress: 40
    }
  ];
  
  const recommendedRoles = [
    {
      title: "Lead Data Scientist",
      company: "Netflix",
      match: 95,
      salary: "$145,000 - $170,000"
    },
    {
      title: "AI Research Scientist",
      company: "OpenAI",
      match: 92,
      salary: "$160,000 - $190,000"
    },
    {
      title: "Senior ML Engineer",
      company: "Microsoft",
      match: 89,
      salary: "$135,000 - $165,000"
    }
  ];
  
  const handleAddSkill = () => {
    if (newSkill.trim() !== '') {
      setProfileData({
        ...profileData,
        skills: [
          ...profileData.skills,
          { name: newSkill, level: newSkillLevel }
        ]
      });
      setNewSkill('');
      setNewSkillLevel(85);
      setIsAddingSkill(false);
    }
  };
  
  const handleRemoveSkill = (skillToRemove) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter(skill => skill.name !== skillToRemove)
    });
  };
  
  const getSkillLevelColor = (level) => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 80) return 'bg-blue-500';
    if (level >= 70) return 'bg-indigo-500';
    if (level >= 60) return 'bg-purple-500';
    return 'bg-pink-500';
  };
  
  return (
    <div className="min-h-screen bg-indigo-50">
      <Navbar />
      
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-indigo-800 to-indigo-900 pt-28 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-10">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-indigo-600 border-4 border-white overflow-hidden flex items-center justify-center text-white">
                <FiUser className="w-16 h-16 md:w-20 md:h-20" />
              </div>
              <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors">
                <FiCamera className="w-4 h-4" />
              </button>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
                <div>
                  <h1 className="text-3xl font-bold text-white">{profileData.name}</h1>
                  <p className="text-indigo-200">{profileData.title} at {profileData.company}</p>
                  <div className="flex items-center mt-2 text-indigo-200">
                    <FiMapPin className="mr-1" />
                    <span>{profileData.location}</span>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0">
                  <button 
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    className="bg-white text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors flex items-center"
                  >
                    <FiEdit2 className="mr-2" />
                    {isEditingProfile ? 'Cancel Editing' : 'Edit Profile'}
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{profileData.projectsCompleted}</div>
                  <div className="text-xs text-indigo-200">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{profileData.recommendations}</div>
                  <div className="text-xs text-indigo-200">Recommendations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{profileData.connections}</div>
                  <div className="text-xs text-indigo-200">Connections</div>
                </div>
                <div className="ml-auto flex space-x-3">
                  <a href={profileData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="bg-indigo-700/50 p-2 rounded-full hover:bg-indigo-700 transition-colors text-white">
                    <FiLinkedin className="w-5 h-5" />
                  </a>
                  <a href={profileData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="bg-indigo-700/50 p-2 rounded-full hover:bg-indigo-700 transition-colors text-white">
                    <FiTwitter className="w-5 h-5" />
                  </a>
                  <a href={profileData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="bg-indigo-700/50 p-2 rounded-full hover:bg-indigo-700 transition-colors text-white">
                    <FiGithub className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Navigation */}
      <div className="bg-white border-b shadow-sm sticky top-16 z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto hide-scrollbar">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${activeTab === 'profile' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            >
              Profile
            </button>
            <button 
              onClick={() => setActiveTab('career')}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${activeTab === 'career' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            >
              Career Analytics
            </button>
            <button 
              onClick={() => setActiveTab('learning')}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${activeTab === 'learning' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            >
              Learning Path
            </button>
            <button 
              onClick={() => setActiveTab('connections')}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${activeTab === 'connections' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            >
              Connections
            </button>
            <button 
              onClick={() => setActiveTab('mentors')}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${activeTab === 'mentors' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            >
              Mentors
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${activeTab === 'settings' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            >
              Settings
            </button>
          </div>
        </div>
      </div>
      
      {/* Profile Content */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-8">
              {/* About Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">About</h2>
                  {isEditingProfile && (
                    <button className="text-indigo-600 hover:text-indigo-800">
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <p className="text-gray-600">
                  {profileData.about}
                </p>
                
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-start mb-3">
                    <FiMail className="w-5 h-5 text-indigo-500 mr-3 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="text-gray-800">{profileData.email}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiPhone className="w-5 h-5 text-indigo-500 mr-3 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="text-gray-800">{profileData.phone}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Skills Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
                  {isEditingProfile && (
                    <button 
                      onClick={() => setIsAddingSkill(true)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <FiPlus className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                {isAddingSkill && (
                  <div className="mb-4 p-3 bg-indigo-50 rounded-lg">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Skill name"
                      className="w-full mb-2 p-2 border rounded"
                    />
                    <div className="flex items-center mb-2">
                      <span className="text-sm text-gray-600 mr-2">Level:</span>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={newSkillLevel}
                        onChange={(e) => setNewSkillLevel(parseInt(e.target.value))}
                        className="flex-1 mr-2"
                      />
                      <span className="text-sm text-gray-600">{newSkillLevel}%</span>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => setIsAddingSkill(false)}
                        className="p-1 text-gray-500 hover:text-gray-700"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={handleAddSkill}
                        className="p-1 text-indigo-600 hover:text-indigo-800"
                      >
                        <FiCheck className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  {profileData.skills.map((skill, index) => (
                    <div key={index} className="relative">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700">{skill.name}</span>
                        <span className="text-gray-500 text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${getSkillLevelColor(skill.level)} h-2 rounded-full`} 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      {isEditingProfile && (
                        <button 
                          onClick={() => handleRemoveSkill(skill.name)}
                          className="absolute -right-2 -top-2 text-red-500 hover:text-red-700 bg-white rounded-full p-0.5 shadow-sm"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Languages Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Languages</h2>
                  {isEditingProfile && (
                    <button className="text-indigo-600 hover:text-indigo-800">
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <div className="space-y-3">
                  {profileData.languages.map((language, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-700">{language.name}</span>
                      <span className="text-indigo-600 text-sm">{language.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Certifications Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Certifications</h2>
                  {isEditingProfile && (
                    <button className="text-indigo-600 hover:text-indigo-800">
                      <FiPlus className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <div className="space-y-4">
                  {profileData.certifications.map((cert, index) => (
                    <div key={index} className="border-l-2 border-indigo-500 pl-4">
                      <div className="font-medium text-gray-800">{cert.name}</div>
                      <div className="text-sm text-gray-600">
                        {cert.issuer} • {cert.year}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Career Summary */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-indigo-600 p-4">
                  <h2 className="text-lg font-semibold text-white">Career Summary</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                  {careerStats.map((stat, index) => (
                    <div key={index} className="bg-indigo-50 rounded-lg p-4 flex items-start">
                      <div className="bg-white p-2 rounded-lg mr-4">
                        {stat.icon}
                      </div>
                      <div>
                        <div className="text-xs text-indigo-500 font-medium">{stat.name}</div>
                        <div className="text-xl font-bold text-indigo-900">{stat.value}</div>
                        <div className="text-xs text-gray-600 mt-1">{stat.description}</div>
                        <div className={`text-xs font-medium mt-2 inline-flex items-center ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                          {stat.trendUp ? '↑' : '↓'} {stat.trend}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Experience Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-800">Experience</h2>
                  {isEditingProfile && (
                    <button className="text-indigo-600 hover:text-indigo-800">
                      <FiPlus className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <div className="space-y-8">
                  {profileData.experience.map((exp, index) => (
                    <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-indigo-200">
                      <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-indigo-600 -translate-x-1/2"></div>
                      <div className="flex flex-wrap justify-between items-start mb-1">
                        <h3 className="text-lg font-medium text-gray-800 mr-4">{exp.role}</h3>
                        <div className="text-indigo-600 font-medium">{exp.duration}</div>
                      </div>
                      <div className="text-indigo-500 mb-2">{exp.company}</div>
                      <p className="text-gray-600">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Education Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-800">Education</h2>
                  {isEditingProfile && (
                    <button className="text-indigo-600 hover:text-indigo-800">
                      <FiPlus className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <div className="space-y-6">
                  {profileData.education.map((edu, index) => (
                    <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-indigo-200">
                      <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-indigo-600 -translate-x-1/2"></div>
                      <div className="flex flex-wrap justify-between items-start mb-1">
                        <h3 className="text-lg font-medium text-gray-800 mr-4">{edu.degree}</h3>
                        <div className="text-indigo-600 font-medium">{edu.year}</div>
                      </div>
                      <div className="text-indigo-500">{edu.institution}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'career' && (
          <div className="space-y-8">
            {/* Analytics Overview */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-indigo-600 p-4">
                <h2 className="text-lg font-semibold text-white">Career Analytics</h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-indigo-50 rounded-lg p-4 flex flex-col">
                    <div className="text-sm text-indigo-600 font-medium mb-2">Skills Radar</div>
                    <div className="h-64 flex items-center justify-center bg-white rounded-lg p-4">
                      <div className="text-gray-400 italic">Skills radar chart visualization</div>
                    </div>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-4 flex flex-col">
                    <div className="text-sm text-indigo-600 font-medium mb-2">Salary Trends</div>
                    <div className="h-64 flex items-center justify-center bg-white rounded-lg p-4">
                      <div className="text-gray-400 italic">Salary trend line chart</div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium text-gray-800 mb-4">Recommended Roles</h3>
                <div className="space-y-4">
                  {recommendedRoles.map((role, index) => (
                    <div key={index} className="bg-indigo-50 rounded-lg p-4">
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h4 className="text-indigo-800 font-medium">{role.title}</h4>
                            <span className="ml-2 text-xs font-medium px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                              {role.match}% Match
                            </span>
                          </div>
                          <div className="text-gray-600">{role.company}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-indigo-600 font-medium">{role.salary}</div>
                          <div className="text-xs text-gray-500">Estimated Salary</div>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between">
                        <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                          View Details
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                          <FiBookmark className="inline mr-1" /> Save
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Upcoming Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
            

<h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Actions</h2>
<div className="space-y-4">
  {upcomingActions.map((action, index) => (
    <div key={index} className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between mb-2">
        <div>
          <h4 className="font-medium text-gray-800">{action.title}</h4>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-3">{action.type}</span>
            <span className="flex items-center">
              <FiCalendar className="mr-1 w-3 h-3" /> 
              Due: {action.dueDate}
            </span>
          </div>
        </div>
        <div className="text-xl font-bold text-indigo-600">{action.progress}%</div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-indigo-600 h-2 rounded-full" 
          style={{ width: `${action.progress}%` }}
        ></div>
      </div>
    </div>
  ))}
</div>
</div>
</div>
)}

{activeTab === 'learning' && (
<div className="space-y-8">
<div className="bg-white rounded-xl shadow-sm p-6">
<h2 className="text-lg font-semibold text-gray-800 mb-6">Your Learning Path</h2>

<div className="mb-6">
  <div className="flex justify-between mb-2">
    <h3 className="font-medium text-gray-700">Overall Progress</h3>
    <span className="text-indigo-600 font-medium">68%</span>
  </div>
  <div className="w-full bg-gray-200 rounded-full h-3">
    <div className="bg-indigo-600 h-3 rounded-full" style={{ width: '68%' }}></div>
  </div>
</div>

<div className="space-y-8">
  {/* Learning Path Item - In Progress */}
  <div className="border-l-2 border-indigo-500 pl-6 relative">
    <div className="absolute left-0 top-0 w-5 h-5 rounded-full bg-indigo-500 -translate-x-1/2 flex items-center justify-center">
      <FiClock className="text-white w-3 h-3" />
    </div>
    
    <div className="bg-indigo-50 rounded-lg p-4">
      <div className="flex justify-between mb-2">
        <h3 className="font-medium text-indigo-800">Advanced Machine Learning Specialization</h3>
        <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded font-medium">In Progress</span>
      </div>
      
      <p className="text-gray-600 mb-4">
        Master advanced ML concepts including deep learning, reinforcement learning, and specialized algorithms for different data types.
      </p>
      
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-600">Progress</span>
        <span className="text-sm text-indigo-600 font-medium">65%</span>
      </div>
      <div className="w-full bg-white rounded-full h-2 mb-4">
        <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '65%' }}></div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <FiCalendar className="inline mr-1" /> 
          Estimated completion: May 15, 2025
        </div>
        <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
          Continue Learning
        </button>
      </div>
    </div>
  </div>
  
  {/* Learning Path Item - Not Started */}
  <div className="border-l-2 border-gray-300 pl-6 relative">
    <div className="absolute left-0 top-0 w-5 h-5 rounded-full bg-gray-300 -translate-x-1/2 flex items-center justify-center">
      <FiClock className="text-white w-3 h-3" />
    </div>
    
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex justify-between mb-2">
        <h3 className="font-medium text-gray-700">MLOps and Production Systems</h3>
        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium">Not Started</span>
      </div>
      
      <p className="text-gray-600 mb-4">
        Learn how to deploy, scale, and monitor machine learning models in production environments using industry best practices.
      </p>
      
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-600">Progress</span>
        <span className="text-sm text-gray-600 font-medium">0%</span>
      </div>
      <div className="w-full bg-white rounded-full h-2 mb-4">
        <div className="bg-gray-300 h-2 rounded-full" style={{ width: '0%' }}></div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <FiCalendar className="inline mr-1" /> 
          Unlock after current course completion
        </div>
        <button className="text-gray-400 cursor-not-allowed font-medium text-sm">
          Start Learning
        </button>
      </div>
    </div>
  </div>
  
  {/* Learning Path Item - Completed */}
  <div className="border-l-2 border-green-500 pl-6 relative">
    <div className="absolute left-0 top-0 w-5 h-5 rounded-full bg-green-500 -translate-x-1/2 flex items-center justify-center">
      <FiCheck className="text-white w-3 h-3" />
    </div>
    
    <div className="bg-green-50 rounded-lg p-4">
      <div className="flex justify-between mb-2">
        <h3 className="font-medium text-green-800">Data Science Fundamentals</h3>
        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-medium">Completed</span>
      </div>
      
      <p className="text-gray-600 mb-4">
        Core concepts of data analysis, statistical methods, and basic machine learning algorithms for predictive modeling.
      </p>
      
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-600">Progress</span>
        <span className="text-sm text-green-600 font-medium">100%</span>
      </div>
      <div className="w-full bg-white rounded-full h-2 mb-4">
        <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <FiCalendar className="inline mr-1" /> 
          Completed: January 10, 2025
        </div>
        <button className="text-green-600 hover:text-green-800 font-medium text-sm">
          View Certificate
        </button>
      </div>
    </div>
  </div>
</div>
</div>

<div className="bg-white rounded-xl shadow-sm p-6">
<h2 className="text-lg font-semibold text-gray-800 mb-4">Recommended Courses</h2>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Course Card 1 */}
  <div className="border border-gray-200 rounded-lg overflow-hidden">
    <div className="h-40 bg-indigo-100 flex items-center justify-center">
      <FiFileText className="w-12 h-12 text-indigo-500" />
    </div>
    <div className="p-4">
      <h3 className="font-medium text-gray-800 mb-1">Deep Learning Specialization</h3>
      <div className="text-sm text-gray-500 mb-3">by Stanford University</div>
      <div className="flex items-center mb-3">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
          ))}
        </div>
        <span className="text-xs text-gray-500 ml-1">(4.8)</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-indigo-600 font-medium">$79</span>
        <button className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded transition-colors">
          Add to Path
        </button>
      </div>
    </div>
  </div>
  
  {/* Course Card 2 */}
  <div className="border border-gray-200 rounded-lg overflow-hidden">
    <div className="h-40 bg-indigo-100 flex items-center justify-center">
      <FiFileText className="w-12 h-12 text-indigo-500" />
    </div>
    <div className="p-4">
      <h3 className="font-medium text-gray-800 mb-1">Data Engineering on AWS</h3>
      <div className="text-sm text-gray-500 mb-3">by Amazon Web Services</div>
      <div className="flex items-center mb-3">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} className={`w-4 h-4 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
          ))}
        </div>
        <span className="text-xs text-gray-500 ml-1">(4.9)</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-indigo-600 font-medium">$119</span>
        <button className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded transition-colors">
          Add to Path
        </button>
      </div>
    </div>
  </div>
  
  {/* Course Card 3 */}
  <div className="border border-gray-200 rounded-lg overflow-hidden">
    <div className="h-40 bg-indigo-100 flex items-center justify-center">
      <FiFileText className="w-12 h-12 text-indigo-500" />
    </div>
    <div className="p-4">
      <h3 className="font-medium text-gray-800 mb-1">NLP with Transformers</h3>
      <div className="text-sm text-gray-500 mb-3">by DeepLearning.AI</div>
      <div className="flex items-center mb-3">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
          ))}
        </div>
        <span className="text-xs text-gray-500 ml-1">(4.7)</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-indigo-600 font-medium">$89</span>
        <button className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded transition-colors">
          Add to Path
        </button>
      </div>
    </div>
  </div>
</div>
</div>
</div>
)}

{activeTab === 'connections' && (
<div className="space-y-8">
<div className="bg-white rounded-xl shadow-sm p-6">
<div className="flex justify-between items-center mb-6">
  <h2 className="text-lg font-semibold text-gray-800">Your Connections</h2>
  <div className="relative">
    <input
      type="text"
      className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      placeholder="Search connections..."
    />
    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
  </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Connection Card (Sample) */}
  {[...Array(6)].map((_, index) => (
    <div key={index} className="border border-gray-200 rounded-lg p-4 flex">
      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
        <FiUser className="w-8 h-8 text-indigo-500" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-800">
          {["Michael Chen", "Sarah Williams", "David Kim", "Jennifer Lopez", "Robert Johnson", "Emily Baker"][index % 6]}
        </h3>
        <div className="text-sm text-gray-500 mb-2">
          {["Lead Data Scientist", "ML Engineer", "AI Researcher", "Data Analyst", "Product Manager", "Software Engineer"][index % 6]} at 
          {[" Google", " Microsoft", " IBM", " Nvidia", " Facebook", " Amazon"][index % 6]}
        </div>
        <div className="flex space-x-2">
          <button className="text-xs text-indigo-600 hover:text-indigo-800">Message</button>
          <span className="text-gray-300">|</span>
          <button className="text-xs text-indigo-600 hover:text-indigo-800">View Profile</button>
        </div>
      </div>
    </div>
  ))}
</div>

<div className="mt-6 flex justify-center">
  <button className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
    View All Connections <FiChevronRight className="ml-1" />
  </button>
</div>
</div>

<div className="bg-white rounded-xl shadow-sm p-6">
<h2 className="text-lg font-semibold text-gray-800 mb-6">People You May Know</h2>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Suggestion Card (Sample) */}
  {[...Array(3)].map((_, index) => (
    <div key={index} className="border border-gray-200 rounded-lg p-4 flex">
      <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
        <FiUser className="w-8 h-8 text-indigo-500" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-800">
          {["James Wilson", "Priya Patel", "Thomas Anderson"][index % 3]}
        </h3>
        <div className="text-sm text-gray-500 mb-2">
          {["AI Director", "Data Science Manager", "Research Scientist"][index % 3]} at 
          {[" OpenAI", " Netflix", " DeepMind"][index % 3]}
        </div>
        <div className="text-xs text-gray-500 mb-3">12 mutual connections</div>
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-1 rounded-lg text-sm transition-colors">
          Connect
        </button>
      </div>
    </div>
  ))}
</div>
</div>
</div>
)}

{/* Add content for Mentors Tab */}
{activeTab === 'mentors' && (
<div className="space-y-8">
<div className="bg-white rounded-xl shadow-sm p-6">
<h2 className="text-lg font-semibold text-gray-800 mb-6">Your Mentors</h2>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Mentor Card */}
  <div className="border border-gray-200 rounded-lg p-6">
    <div className="flex items-start">
      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
        <FiUser className="w-10 h-10 text-indigo-500" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 text-xl">Dr. Lisa Thompson</h3>
        <div className="text-indigo-600 mb-1">Chief AI Officer at TechVision</div>
        <div className="text-sm text-gray-500 mb-3">Mentoring since January 2025</div>
        
        <div className="flex space-x-3 mt-4">
          <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm transition-colors">
            Schedule Session
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <FiMail className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
    
    <div className="mt-6 pt-6 border-t border-gray-200">
      <h4 className="font-medium text-gray-700 mb-2">Expertise</h4>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">Machine Learning</span>
        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">Leadership</span>
        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">AI Ethics</span>
        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">Research</span>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Next session: March 18, 2025
        </div>
        <div className="text-sm font-medium text-indigo-600">
          5 sessions completed
        </div>
      </div>
    </div>
  </div>
  
  <div className="border border-gray-200 rounded-lg p-6">
    <div className="flex items-start">
      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
        <FiUser className="w-10 h-10 text-indigo-500" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 text-xl">Mark Rodriguez</h3>
        <div className="text-indigo-600 mb-1">VP of Data Science at DataCorp</div>
        <div className="text-sm text-gray-500 mb-3">Mentoring since February 2025</div>
        
        <div className="flex space-x-3 mt-4">
          <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm transition-colors">
            Schedule Session
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <FiMail className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
    
    <div className="mt-6 pt-6 border-t border-gray-200">
      <h4 className="font-medium text-gray-700 mb-2">Expertise</h4>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">Data Strategy</span>
        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">Team Management</span>
        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">Product Development</span>
        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">Career Growth</span>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Next session: March 22, 2025
        </div>
        <div className="text-sm font-medium text-indigo-600">
          3 sessions completed
        </div>
      </div>
    </div>
  </div>
</div>
</div>

<div className="bg-white rounded-xl shadow-sm p-6">
<div className="flex justify-between items-center mb-6">
  <h2 className="text-lg font-semibold text-gray-800">Recommended Mentors</h2>
  <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
    View All
  </button>
</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {[...Array(3)].map((_, index) => (
    <div key={index} className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
          <FiUser className="w-7 h-7 text-indigo-500" />
        </div>
        <div>
          <h3 className="font-medium text-gray-800">
            {["Dr. James Wilson", "Sarah Chen", "Michael Brown"][index % 3]}
          </h3>
          <div className="text-sm text-indigo-600">
            {["AI Research Lead", "Senior Data Architect", "ML Engineering Director"][index % 3]}
          </div>
        </div>
      </div>
      
      <div className="text-sm text-gray-600 mb-4">
        {[
          "Expert in deep learning research with 15+ years of experience in computer vision and NLP.",
          "Specialized in enterprise data architecture and cloud infrastructure for AI applications.",
          "Focus on scaling ML systems and building high-performance AI teams."
        ][index % 3]}
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          ["Research", "Deep Learning", "Computer Vision"],
          ["Data Architecture", "Cloud", "Enterprise AI"],
          ["Team Building", "ML Engineering", "Leadership"]
        ][index % 3].map((tag, i) => (
          <span key={i} className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full text-xs">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between">
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">92%</span> match
        </div>
        <button className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded transition-colors">
          Request Mentorship
        </button>
      </div>
    </div>
  ))}
</div>
</div>
</div>
)}

{/* Add content for Settings Tab */}
{activeTab === 'settings' && (
<div className="space-y-8">
<div className="bg-white rounded-xl shadow-sm p-6">
<h2 className="text-lg font-semibold text-gray-800 mb-6">Account Settings</h2>

<div className="space-y-6">
  <div>
    <h3 className="font-medium text-gray-700 mb-4">Personal Information</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm text-gray-600 mb-1">Full Name</label>
        <input 
          type="text" 
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          defaultValue={profileData.name}
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Email</label>
        <input 
          type="email" 
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          defaultValue={profileData.email}
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Phone</label>
        <input 
          type="text" 
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          defaultValue={profileData.phone}
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Location</label>
        <input 
          type="text" 
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          defaultValue={profileData.location}
        />
      </div>
    </div>
  </div>
  
  <div className="pt-4 border-t">
    <h3 className="font-medium text-gray-700 mb-4">Password</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm text-gray-600 mb-1">Current Password</label>
        <input 
          type="password" 
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="••••••••"
        />
      </div>
      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">New Password</label>
          <input 
                          type="password" 
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Confirm New Password</label>
                        <input 
                          type="password" 
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium text-gray-700 mb-4">Privacy Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-700">Profile Visibility</div>
                        <div className="text-sm text-gray-500">Control who can see your profile information</div>
                      </div>
                      <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                        <option>Everyone</option>
                        <option>Connections Only</option>
                        <option>Private</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-700">Email Notifications</div>
                        <div className="text-sm text-gray-500">Receive emails about new opportunities and updates</div>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200">
                        <input type="checkbox" id="toggle1" className="sr-only" defaultChecked />
                        <label 
                          htmlFor="toggle1" 
                          className="absolute inset-0 rounded-full bg-indigo-600 cursor-pointer transition-colors duration-200 ease-in-out"
                        >
                          <span className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow transform translate-x-6 transition duration-200 ease-in-out"></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-700">Learning Reminders</div>
                        <div className="text-sm text-gray-500">Receive reminders about your learning progress</div>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200">
                        <input type="checkbox" id="toggle2" className="sr-only" defaultChecked />
                        <label 
                          htmlFor="toggle2" 
                          className="absolute inset-0 rounded-full bg-indigo-600 cursor-pointer transition-colors duration-200 ease-in-out"
                        >
                          <span className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow transform translate-x-6 transition duration-200 ease-in-out"></span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-700">Data Analytics</div>
                        <div className="text-sm text-gray-500">Allow us to analyze your data for better recommendations</div>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200">
                        <input type="checkbox" id="toggle3" className="sr-only" defaultChecked />
                        <label 
                          htmlFor="toggle3" 
                          className="absolute inset-0 rounded-full bg-indigo-600 cursor-pointer transition-colors duration-200 ease-in-out"
                        >
                          <span className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow transform translate-x-6 transition duration-200 ease-in-out"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium text-gray-700 mb-4">Connected Accounts</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <FiLinkedin className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">LinkedIn</div>
                          <div className="text-sm text-gray-500">Connected</div>
                        </div>
                      </div>
                      <button className="text-sm text-red-600 hover:text-red-800">Disconnect</button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                          <FiGithub className="w-5 h-5 text-gray-700" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">GitHub</div>
                          <div className="text-sm text-gray-500">Connected</div>
                        </div>
                      </div>
                      <button className="text-sm text-red-600 hover:text-red-800">Disconnect</button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <FiTwitter className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-700">Twitter</div>
                          <div className="text-sm text-gray-500">Not connected</div>
                        </div>
                      </div>
                      <button className="text-sm text-indigo-600 hover:text-indigo-800">Connect</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
                <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Subscription & Billing</h2>
              
              <div className="bg-indigo-50 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                    <FiStar className="text-indigo-600 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-indigo-800">Premium Plan</h3>
                    <p className="text-sm text-gray-600 mb-2">Your plan renews on April 15, 2025</p>
                    <div className="flex space-x-3">
                      <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Upgrade</button>
                      <span className="text-gray-300">|</span>
                      <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">View Details</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Payment Method</h3>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-6 bg-blue-100 rounded flex items-center justify-center mr-3">
                      <span className="text-blue-600 text-xs font-bold">VISA</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-700">•••• •••• •••• 4242</div>
                      <div className="text-xs text-gray-500">Expires 09/26</div>
                    </div>
                  </div>
                  <div className="text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer">Edit</div>
                </div>
                
                <div className="flex justify-end">
                  <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                    + Add Payment Method
                  </button>
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium text-gray-700 mb-3">Billing History</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[
                          {date: "Mar 15, 2025", desc: "Premium Plan - Monthly", amount: "$29.99", status: "Paid"},
                          {date: "Feb 15, 2025", desc: "Premium Plan - Monthly", amount: "$29.99", status: "Paid"},
                          {date: "Jan 15, 2025", desc: "Premium Plan - Monthly", amount: "$29.99", status: "Paid"}
                        ].map((item, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 text-sm text-gray-500">{item.date}</td>
                            <td className="px-4 py-3 text-sm text-gray-800">{item.desc}</td>
                            <td className="px-4 py-3 text-sm text-gray-800">{item.amount}</td>
                            <td className="px-4 py-3 text-sm">
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                {item.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer">
                              Download
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-red-800 mb-4">Danger Zone</h2>
              <p className="text-sm text-gray-600 mb-6">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button className="px-4 py-2 bg-white border border-red-500 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default UserProfile;