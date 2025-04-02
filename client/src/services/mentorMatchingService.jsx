import { 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    addDoc, 
    updateDoc, 
    query, 
    where, 
    serverTimestamp 
  } from 'firebase/firestore';
  import { db } from '../firebase';
  
  // Function to get all available mentors
  export const getAvailableMentors = async () => {
    try {
      const mentorsRef = collection(db, 'mentors');
      const q = query(mentorsRef, where('isAvailable', '==', true));
      const querySnapshot = await getDocs(q);
      
      const mentors = [];
      querySnapshot.forEach((doc) => {
        mentors.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return mentors;
    } catch (error) {
      console.error('Error getting mentors:', error);
      throw error;
    }
  };
  
  // Function to get mentor by ID
  export const getMentorById = async (mentorId) => {
    try {
      const mentorDoc = await getDoc(doc(db, 'mentors', mentorId));
      
      if (mentorDoc.exists()) {
        return {
          id: mentorDoc.id,
          ...mentorDoc.data()
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting mentor:', error);
      throw error;
    }
  };
  
  // Function to get user profile including skills and interests
  export const getUserProfile = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      
      if (userDoc.exists()) {
        return {
          id: userDoc.id,
          ...userDoc.data()
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  };
  
  // Function to request a match with a mentor
  export const requestMentorMatch = async (userId, mentorId, message) => {
    try {
      const requestRef = collection(db, 'mentorRequests');
      const newRequest = {
        userId,
        mentorId,
        message,
        status: 'pending', // pending, accepted, rejected
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(requestRef, newRequest);
      return { id: docRef.id, ...newRequest };
    } catch (error) {
      console.error('Error requesting mentor match:', error);
      throw error;
    }
  };
  
  // Function to get all mentor requests for a user
  export const getUserMentorRequests = async (userId) => {
    try {
      const requestsRef = collection(db, 'mentorRequests');
      const q = query(requestsRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      const requests = [];
      querySnapshot.forEach((doc) => {
        requests.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return requests;
    } catch (error) {
      console.error('Error getting user mentor requests:', error);
      throw error;
    }
  };
  
  // Function to get suggested mentors based on user's skills, interests, and career goals
  export const getSuggestedMentors = async (userId) => {
    try {
      // Get user profile
      const userProfile = await getUserProfile(userId);
      
      if (!userProfile) {
        throw new Error('User profile not found');
      }
      
      // Get all available mentors
      const mentors = await getAvailableMentors();
      
      if (mentors.length === 0) {
        return [];
      }
      
      // Extract user skills, interests, and career goals
      const userSkills = userProfile.skills || [];
      const userInterests = userProfile.interests || [];
      const userCareerGoals = userProfile.careerGoals || [];
      const userIndustry = userProfile.industry || '';
      
      // Calculate match score for each mentor
      const scoredMentors = mentors.map(mentor => {
        let score = 0;
        
        // Match skills
        const mentorSkills = mentor.skills || [];
        const skillsMatch = userSkills.filter(skill => 
          mentorSkills.includes(skill)
        ).length;
        score += skillsMatch * 2; // Weight skills higher
        
        // Match interests
        const mentorInterests = mentor.interests || [];
        const interestsMatch = userInterests.filter(interest => 
          mentorInterests.includes(interest)
        ).length;
        score += interestsMatch;
        
        // Match career goals
        const mentorExpertise = mentor.expertiseAreas || [];
        const careerGoalsMatch = userCareerGoals.filter(goal => 
          mentorExpertise.includes(goal)
        ).length;
        score += careerGoalsMatch * 3; // Weight career goals highest
        
        // Match industry
        if (mentor.industry === userIndustry) {
          score += 2;
        }
        
        // Experience level matching
        const userExperienceLevel = userProfile.experienceLevel || 'beginner';
        if (mentor.preferredMenteeLevel === userExperienceLevel || 
            mentor.preferredMenteeLevel === 'any') {
          score += 1;
        }
        
        return {
          ...mentor,
          matchScore: score
        };
      });
      
      // Sort mentors by match score (descending)
      return scoredMentors.sort((a, b) => b.matchScore - a.matchScore);
    } catch (error) {
      console.error('Error getting suggested mentors:', error);
      throw error;
    }
  };
  
  // Function to simulate GPT-based mentor matching
  export const getGPTSuggestedMentors = async (userId) => {
    try {
      // In a real app, you would call the OpenAI API here
      // For this demo, we'll use the scoring-based approach and add some simulated GPT analysis
      
      // Get scored mentors using the basic scoring approach
      const scoredMentors = await getSuggestedMentors(userId);
      
      // Get user profile
      const userProfile = await getUserProfile(userId);
      
      // Enhance each match with a simulated GPT analysis
      return scoredMentors.map(mentor => {
        // Generate a personalized match reason
        let matchReason = '';
        
        if (mentor.matchScore > 5) {
          matchReason = `This mentor is an excellent match for your ${mentor.industry} career goals and has expertise in ${mentor.expertiseAreas?.join(', ') || 'various areas'}.`;
        } else if (mentor.matchScore > 3) {
          matchReason = `This mentor has good alignment with your ${userProfile.skills?.slice(0, 2).join(' and ')} skills and could help with your career transition.`;
        } else {
          matchReason = `This mentor brings a diverse perspective that could complement your current skill set.`;
        }
        
        // Add personalized career advice
        let careerAdvice = '';
        if (mentor.expertiseAreas?.includes('leadership')) {
          careerAdvice = 'Could help develop your leadership skills for future management roles.';
        } else if (mentor.expertiseAreas?.includes('technology')) {
          careerAdvice = 'Their technical expertise could help you stay current with the latest industry trends.';
        } else if (mentor.expertiseAreas?.includes('entrepreneurship')) {
          careerAdvice = "Some Advice";
        }
        
        return {
          ...mentor,
          gptMatchReason: matchReason,
          gptCareerAdvice: careerAdvice,
          gptCompatibilityScore: (mentor.matchScore / 10) * 100 // Normalize to a percentage
        };
      });
    } catch (error) {
      console.error('Error getting GPT suggested mentors:', error);
      throw error;
    }
  };
  
  // Function to submit feedback after mentorship session
  export const submitMentorshipFeedback = async (sessionId, feedback) => {
    try {
      const feedbackRef = collection(db, 'mentorshipFeedback');
      const newFeedback = {
        sessionId,
        ...feedback,
        createdAt: serverTimestamp()
      };
      
      const docRef = await addDoc(feedbackRef, newFeedback);
      return { id: docRef.id, ...newFeedback };
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }
  };