import React, { useEffect, useState } from 'react';
import { FiUser, FiMail, FiPhone, FiEdit2, FiShield, FiLock, FiSave, FiX, FiMapPin, FiBriefcase, FiGlobe } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

const UserProfile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    bio: '',
    location: '',
    occupation: '',
    website: '',
    skills: []
  });

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const user = auth.currentUser;
        
        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setCurrentUser({
              uid: user.uid,
              email: user.email,
              emailVerified: user.emailVerified,
              ...userData
            });
            
            setFormData({
              firstName: userData.firstName || '',
              lastName: userData.lastName || '',
              phone: userData.phone || '',
              bio: userData.bio || '',
              location: userData.location || '',
              occupation: userData.occupation || '',
              website: userData.website || '',
              skills: userData.skills || []
            });
          } else {
            // Handle case where user auth exists but no Firestore document
            setCurrentUser({
              uid: user.uid,
              email: user.email,
              emailVerified: user.emailVerified
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean);
    setFormData(prev => ({
      ...prev,
      skills
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    
    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("No user is currently signed in");
        return;
      }

      // Update user profile in Firestore
      const userDocRef = doc(db, "users", user.uid);
      
      await updateDoc(userDocRef, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        bio: formData.bio,
        location: formData.location,
        occupation: formData.occupation,
        website: formData.website,
        skills: formData.skills,
        updatedAt: new Date().toISOString()
      });

      // Update displayName in Firebase Auth
      const displayName = `${formData.firstName} ${formData.lastName}`.trim();
      if (displayName) {
        await updateProfile(user, { displayName });
      }

      // Handle profile image upload (simplified - in a real app, you'd upload to Firebase Storage)
      if (profileImage) {
        // Here you would upload to Firebase Storage and get a URL
        // For now, we'll just update the user with the placeholder
        // This is a placeholder - you would implement actual Firebase Storage upload
        console.log("Profile image would be uploaded in a real implementation");
      }

      // Update local state with new data
      setCurrentUser(prev => ({
        ...prev,
        ...formData
      }));

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // Reset form data to current values when entering edit mode
      setFormData({
        firstName: currentUser?.firstName || '',
        lastName: currentUser?.lastName || '',
        phone: currentUser?.phone || '',
        bio: currentUser?.bio || '',
        location: currentUser?.location || '',
        occupation: currentUser?.occupation || '',
        website: currentUser?.website || '',
        skills: currentUser?.skills || []
      });
      setImagePreview(null);
      setProfileImage(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="pt-24 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="pt-24 pb-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage your account information and preferences
              </p>
            </div>
            <button
              type="button"
              onClick={toggleEdit}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${
                isEditing
                  ? 'text-gray-700 bg-white hover:bg-gray-50 border-gray-300'
                  : 'text-white bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isEditing ? (
                <>
                  <FiX className="mr-2 -ml-1 h-4 w-4" /> Cancel
                </>
              ) : (
                <>
                  <FiEdit2 className="mr-2 -ml-1 h-4 w-4" /> Edit Profile
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white shadow overflow-hidden rounded-lg">
          {/* Profile header with avatar */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-5 sm:px-6 text-white">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="relative mb-4 sm:mb-0">
                {isEditing ? (
                  <label htmlFor="profile-image" className="cursor-pointer">
                    <div className="h-24 w-24 rounded-full bg-indigo-300 flex items-center justify-center text-indigo-700 text-3xl font-bold relative overflow-hidden">
                      {imagePreview ? (
                        <img 
                          src={imagePreview} 
                          alt="Profile preview" 
                          className="h-full w-full object-cover"
                        />
                      ) : currentUser?.photoURL ? (
                        <img 
                          src={currentUser.photoURL} 
                          alt="Profile" 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        currentUser?.firstName?.charAt(0) || currentUser?.email?.charAt(0) || <FiUser size={32} />
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <FiEdit2 className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="h-24 w-24 rounded-full bg-indigo-300 flex items-center justify-center text-indigo-700 text-3xl font-bold overflow-hidden">
                    {currentUser?.photoURL ? (
                      <img 
                        src={currentUser.photoURL} 
                        alt="Profile" 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      currentUser?.firstName?.charAt(0) || currentUser?.email?.charAt(0) || <FiUser size={32} />
                    )}
                  </div>
                )}
              </div>
              <div className="sm:ml-6 text-center sm:text-left">
                <h2 className="text-2xl font-bold">
                  {currentUser?.firstName ? `${currentUser.firstName} ${currentUser.lastName}` : 'Your Profile'}
                </h2>
                <p className="text-indigo-100 flex items-center justify-center sm:justify-start mt-1">
                  <FiMail className="mr-1.5 h-4 w-4" />
                  {currentUser?.email}
                  {currentUser?.emailVerified && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      <FiShield className="mr-1 h-3 w-3" />
                      Verified
                    </span>
                  )}
                </p>
                {currentUser?.role && (
                  <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 capitalize">
                    {currentUser.role}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  {/* Personal Information */}
                  <div className="sm:col-span-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                  </div>
                  
                  {/* First & Last Name */}
                  <div className="sm:col-span-3">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* Email (readonly) */}
                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={currentUser?.email}
                      disabled
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 text-gray-500 sm:text-sm"
                    />
                    <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                  </div>

                  {/* Phone */}
                  <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  
                  {/* Location */}
                  <div className="sm:col-span-3">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="City, Country"
                    />
                  </div>
                  
                  {/* Occupation */}
                  <div className="sm:col-span-3">
                    <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
                      Occupation
                    </label>
                    <input
                      type="text"
                      name="occupation"
                      id="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Software Developer"
                    />
                  </div>
                  
                  {/* Website */}
                  <div className="sm:col-span-6">
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      id="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="https://example.com"
                    />
                  </div>

                  {/* Skills */}
                  <div className="sm:col-span-6">
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                      Skills (comma separated)
                    </label>
                    <input
                      type="text"
                      name="skills"
                      id="skills"
                      value={formData.skills.join(', ')}
                      onChange={handleSkillsChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="React, JavaScript, Node.js"
                    />
                  </div>

                  {/* Bio */}
                  <div className="sm:col-span-6">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="A short bio about yourself"
                    />
                    <p className="mt-2 text-sm text-gray-500">Brief description for your profile.</p>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={toggleEdit}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                      updating ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    {updating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FiSave className="mr-2 -ml-1 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-8">
                {/* Profile Details */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Details</h3>
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 flex items-center">
                        <FiUser className="mr-1.5 h-4 w-4 text-gray-400" />
                        Full Name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {currentUser?.firstName ? `${currentUser.firstName} ${currentUser.lastName}` : 'Not provided'}
                      </dd>
                    </div>
                    
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 flex items-center">
                        <FiMail className="mr-1.5 h-4 w-4 text-gray-400" />
                        Email
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 flex items-center">
                        {currentUser?.email}
                        {currentUser?.emailVerified && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            <FiShield className="mr-1 h-3 w-3" />
                            Verified
                          </span>
                        )}
                      </dd>
                    </div>
                    
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 flex items-center">
                        <FiPhone className="mr-1.5 h-4 w-4 text-gray-400" />
                        Phone
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {currentUser?.phone || 'Not provided'}
                      </dd>
                    </div>
                    
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 flex items-center">
                        <FiLock className="mr-1.5 h-4 w-4 text-gray-400" />
                        Account Type
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 capitalize">
                        {currentUser?.role || 'User'}
                      </dd>
                    </div>
                    
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 flex items-center">
                        <FiMapPin className="mr-1.5 h-4 w-4 text-gray-400" />
                        Location
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {currentUser?.location || 'Not provided'}
                      </dd>
                    </div>
                    
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500 flex items-center">
                        <FiBriefcase className="mr-1.5 h-4 w-4 text-gray-400" />
                        Occupation
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {currentUser?.occupation || 'Not provided'}
                      </dd>
                    </div>
                    
                    {currentUser?.website && (
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <FiGlobe className="mr-1.5 h-4 w-4 text-gray-400" />
                          Website
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <a 
                            href={currentUser.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-500"
                          >
                            {currentUser.website}
                          </a>
                        </dd>
                      </div>
                    )}
                    
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">Bio</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {currentUser?.bio || 'No bio provided yet.'}
                      </dd>
                    </div>
                  </dl>
                </div>
                
                {/* Skills */}
                {currentUser?.skills && currentUser.skills.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentUser.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;