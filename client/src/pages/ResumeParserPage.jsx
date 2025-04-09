
    // src/components/admin/ResumeParser.jsx
import React, { useState, useRef } from 'react';
import { 
  FiUpload, 
  FiFile, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiDownload, 
  FiBarChart2,
  FiStar,
  FiSearch,
  FiXCircle,
  FiChevronDown,
  FiFilter,
  FiRefreshCw
} from 'react-icons/fi';

const ResumeParser = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('upload');
  const fileInputRef = useRef(null);
  
  // Sample resume analysis result
  const sampleAnalysis = {
    score: 82,
    keywordMatch: 78,
    education: 85,
    experience: 88,
    skills: 76,
    gaps: ['No quantifiable achievements', 'Limited technical skills detail'],
    recommendations: [
      'Add metrics to highlight your achievements',
      'Expand on your technical skills with specific examples',
      'Include relevant certifications',
      'Add more industry-specific keywords'
    ],
    skillsDetected: [
      { name: 'JavaScript', relevance: 'high' },
      { name: 'React', relevance: 'high' },
      { name: 'Node.js', relevance: 'medium' },
      { name: 'Python', relevance: 'low' },
      { name: 'Data Analysis', relevance: 'medium' }
    ],
    extractedData: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '(555) 123-4567',
      location: 'New York, NY',
      education: [
        {
          degree: 'Bachelor of Science in Computer Science',
          institution: 'Columbia University',
          year: '2015-2019'
        }
      ],
      experience: [
        {
          title: 'Frontend Developer',
          company: 'Tech Solutions Inc.',
          period: 'Jan 2020 - Present',
          description: 'Developed responsive web applications using React and Redux...'
        },
        {
          title: 'Web Developer Intern',
          company: 'Digital Creations',
          period: 'Jun 2019 - Dec 2019',
          description: 'Assisted in building and maintaining client websites...'
        }
      ]
    }
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    if (uploadedFiles.length === 0) return;
    
    // Create file objects with status
    const newFiles = uploadedFiles.map(file => ({
      id: Math.random().toString(36).substring(2),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending', // pending, parsing, complete, error
      timestamp: new Date(),
      analysis: null
    }));
    
    setFiles([...files, ...newFiles]);
    
    // Auto-process uploads
    newFiles.forEach(fileObj => {
      processResume(fileObj.id);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    
    if (e.dataTransfer.files.length === 0) return;
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    
    // Create file objects with status
    const newFiles = droppedFiles.map(file => ({
      id: Math.random().toString(36).substring(2),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending', // pending, parsing, complete, error
      timestamp: new Date(),
      analysis: null
    }));
    
    setFiles([...files, ...newFiles]);
    
    // Auto-process uploads
    newFiles.forEach(fileObj => {
      processResume(fileObj.id);
    });
  };

  const processResume = (fileId) => {
    // Update file status to parsing
    setFiles(prevFiles => 
      prevFiles.map(f => 
        f.id === fileId 
          ? { ...f, status: 'parsing' } 
          : f
      )
    );
    
    // Simulate API call with timeout
    setTimeout(() => {
      setFiles(prevFiles => 
        prevFiles.map(f => 
          f.id === fileId 
            ? { 
                ...f, 
                status: 'complete',
                analysis: sampleAnalysis
              } 
            : f
        )
      );
    }, 2000);
  };

  const removeFile = (fileId) => {
    setFiles(prevFiles => prevFiles.filter(f => f.id !== fileId));
    if (selectedFile && selectedFile.id === fileId) {
      setSelectedFile(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleViewDetails = (fileObj) => {
    setSelectedFile(fileObj);
    setCurrentTab('analysis');
  };

  const renderScoreGauge = (score) => {
    let colorClass = '';
    
    if (score >= 80) colorClass = 'text-green-500';
    else if (score >= 60) colorClass = 'text-yellow-500';
    else colorClass = 'text-red-500';
    
    return (
      <div className="relative inline-flex items-center justify-center">
        <svg className="w-32 h-32" viewBox="0 0 36 36">
          <path
            className="text-gray-200"
            fill="currentColor"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            strokeWidth="0"
          />
          <path
            className={colorClass}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${score}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            strokeLinecap="round"
          />
          <text
            x="18"
            y="20.5"
            textAnchor="middle"
            className="text-2xl font-bold fill-gray-800"
          >
            {score}
          </text>
        </svg>
      </div>
    );
  };
  
  const renderCategoryScore = (name, score) => {
    let colorClass = '';
    
    if (score >= 80) colorClass = 'bg-green-100 text-green-800 border-green-200';
    else if (score >= 60) colorClass = 'bg-yellow-100 text-yellow-800 border-yellow-200';
    else colorClass = 'bg-red-100 text-red-800 border-red-200';
    
    return (
      <div className="flex items-center justify-between border rounded-lg p-3 mb-2 bg-white">
        <span className="font-medium">{name}</span>
        <span className={`px-2 py-1 rounded-md text-xs font-medium ${colorClass}`}>
          {score}%
        </span>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Resume Parser & Scoring</h1>
          <p className="mt-1 text-sm text-gray-500">Upload and analyze candidate resumes for job fit and quality</p>
        </div>
        
        {/* Main content card */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setCurrentTab('upload')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  currentTab === 'upload'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Upload & Process
              </button>
              <button
                onClick={() => setCurrentTab('analysis')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  currentTab === 'analysis'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                disabled={!selectedFile}
              >
                Resume Analysis
              </button>
              <button
                onClick={() => setCurrentTab('stats')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  currentTab === 'stats'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Statistics & Reports
              </button>
            </nav>
          </div>
          
          {/* Tab content */}
          <div className="p-6">
            {currentTab === 'upload' && (
              <div>
                {/* Upload area */}
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors cursor-pointer"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    multiple
                    onChange={handleFileUpload}
                  />
                  <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Upload Resumes</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Drag and drop resume files, or click to browse. Supports PDF, DOC, DOCX.
                  </p>
                  <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Select Files
                  </button>
                </div>
                
                {/* Files list */}
                {files.length > 0 && (
                  <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Uploaded Resumes</h3>
                      <div className="flex space-x-2">
                        <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                          <FiFilter className="mr-2 h-4 w-4" />
                          Filter
                        </button>
                        <button 
                          className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          onClick={() => setFiles([])}
                        >
                          <FiXCircle className="mr-2 h-4 w-4" />
                          Clear All
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-white shadow overflow-hidden border border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Resume
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Size
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Score
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Uploaded
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {files.map((fileObj) => (
                            <tr key={fileObj.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                                    <FiFile className="h-6 w-6 text-gray-500" />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{fileObj.name}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{formatFileSize(fileObj.size)}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {fileObj.status === 'pending' && (
                                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                    Pending
                                  </span>
                                )}
                                {fileObj.status === 'parsing' && (
                                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing
                                  </span>
                                )}
                                {fileObj.status === 'complete' && (
                                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Complete
                                  </span>
                                )}
                                {fileObj.status === 'error' && (
                                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    Error
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {fileObj.status === 'complete' && fileObj.analysis ? (
                                  <div className="flex items-center">
                                    <span className={`text-sm font-medium ${
                                      fileObj.analysis.score >= 80 ? 'text-green-600' : 
                                      fileObj.analysis.score >= 60 ? 'text-yellow-600' : 
                                      'text-red-600'
                                    }`}>
                                      {fileObj.analysis.score}%
                                    </span>
                                    <div className="ml-2 flex">
                                      {[...Array(5)].map((_, i) => (
                                        <FiStar key={i} className={`h-4 w-4 ${
                                          i < Math.round(fileObj.analysis.score / 20) 
                                            ? 'text-yellow-400 fill-current' 
                                            : 'text-gray-300'
                                        }`} />
                                      ))}
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-sm text-gray-500">-</span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {fileObj.timestamp.toLocaleTimeString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end space-x-2">
                                  {fileObj.status === 'complete' && (
                                    <button 
                                      onClick={() => handleViewDetails(fileObj)} 
                                      className="text-indigo-600 hover:text-indigo-900"
                                    >
                                      View
                                    </button>
                                  )}
                                  <button 
                                    onClick={() => removeFile(fileObj.id)} 
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {currentTab === 'analysis' && selectedFile && selectedFile.analysis && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Resume Analysis: {selectedFile.name}
                  </h2>
                  <div className="flex space-x-2">
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      <FiDownload className="mr-2 h-4 w-4" />
                      Download Report
                    </button>
                    <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                      <FiBarChart2 className="mr-2 h-4 w-4" />
                      Compare with Job
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left column - Overall score */}
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Top Skills Detected</h3>
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-gray-500">Skills chart will appear here</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Latest Resume Analysis</h3>
                    <div className="relative">
                      <div className="flex items-center">
                        <input
                          type="text"
                          placeholder="Search resumes..."
                          className="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <FiSearch className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Resume
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Candidate
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Job Position
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Score
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {/* Sample data rows */}
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                                <FiFile className="h-6 w-6 text-gray-500" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">resume_john_smith.pdf</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">John Smith</div>
                            <div className="text-sm text-gray-500">john.smith@example.com</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">Senior React Developer</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-green-600">87%</span>
                              <div className="ml-2 flex">
                                {[...Array(5)].map((_, i) => (
                                  <FiStar key={i} className={`h-4 w-4 ${
                                    i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`} />
                                ))}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Apr 8, 2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Shortlisted
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                                <FiFile className="h-6 w-6 text-gray-500" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">emily_wong_resume.pdf</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">Emily Wong</div>
                            <div className="text-sm text-gray-500">e.wong@example.com</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">UI/UX Designer</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-yellow-600">72%</span>
                              <div className="ml-2 flex">
                                {[...Array(5)].map((_, i) => (
                                  <FiStar key={i} className={`h-4 w-4 ${
                                    i < 3.5 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`} />
                                ))}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Apr 7, 2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Under Review
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                                <FiFile className="h-6 w-6 text-gray-500" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">michael_johnson_cv.docx</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">Michael Johnson</div>
                            <div className="text-sm text-gray-500">m.johnson@example.com</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">Full Stack Developer</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-red-600">58%</span>
                              <div className="ml-2 flex">
                                {[...Array(5)].map((_, i) => (
                                  <FiStar key={i} className={`h-4 w-4 ${
                                    i < 3 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`} />
                                ))}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Apr 6, 2025
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Rejected
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">24</span> results
                    </div>
                    <div className="flex space-x-2">
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
                        Previous
                      </button>
                      <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Help section */}
        <div className="mt-8 bg-indigo-50 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-indigo-800">Need help with resume parsing?</h3>
              <p className="mt-1 text-sm text-indigo-700">
                Our AI-powered resume parser can extract key information, score resumes against job requirements, and help you identify top candidates faster.
              </p>
              <div className="mt-3">
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Learn more about our scoring algorithm →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeParser; text-gray-900 mb-4 text-center">Overall Score</h3>
                    <div className="flex justify-center">
                      {renderScoreGauge(selectedFile.analysis.score)}
                    </div>
                    <div className="mt-6 space-y-4">
                      {renderCategoryScore('Keyword Match', selectedFile.analysis.keywordMatch)}
                      {renderCategoryScore('Education', selectedFile.analysis.education)}
                      {renderCategoryScore('Experience', selectedFile.analysis.experience)}
                      {renderCategoryScore('Skills', selectedFile.analysis.skills)}
                    </div>
                  </div>
                  
                  {/* Middle column - Gaps & Recommendations */}
                  <div className="bg-white p-6 rounded-lg shadow">
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Resume Gaps</h3>
                      <ul className="space-y-2">
                        {selectedFile.analysis.gaps.map((gap, index) => (
                          <li key={index} className="flex items-start">
                            <FiAlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                            <span className="text-sm text-gray-700">{gap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Recommendations</h3>
                      <ul className="space-y-2">
                        {selectedFile.analysis.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <FiCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                            <span className="text-sm text-gray-700">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Right column - Skills & Extracted Data */}
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Skills Detected</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedFile.analysis.skillsDetected.map((skill, index) => {
                        let bgColor = 'bg-gray-100 text-gray-800';
                        if (skill.relevance === 'high') bgColor = 'bg-green-100 text-green-800';
                        else if (skill.relevance === 'medium') bgColor = 'bg-blue-100 text-blue-800';
                        
                        return (
                          <span 
                            key={index} 
                            className={`px-3 py-1 rounded-full text-sm font-medium ${bgColor}`}
                          >
                            {skill.name}
                          </span>
                        );
                      })}
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Extracted Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Name</p>
                        <p className="text-sm text-gray-900">{selectedFile.analysis.extractedData.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Contact</p>
                        <p className="text-sm text-gray-900">{selectedFile.analysis.extractedData.email} · {selectedFile.analysis.extractedData.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p className="text-sm text-gray-900">{selectedFile.analysis.extractedData.location}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Education</p>
                        {selectedFile.analysis.extractedData.education.map((edu, index) => (
                          <div key={index} className="text-sm text-gray-900 mb-1">
                            <p className="font-medium">{edu.degree}</p>
                            <p>{edu.institution}, {edu.year}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            