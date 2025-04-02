import { collection, doc, setDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { mentorData } from './mentorData';

// Check if mentors collection already has data
const checkMentorsExist = async () => {
  const mentorsRef = collection(db, 'mentors');
  const q = query(mentorsRef);
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

// Initialize sample mentor data
export const initializeMentors = async () => {
  try {
    // Check if mentors already exist
    const mentorsExist = await checkMentorsExist();
    
    if (mentorsExist) {
      console.log('Mentors collection already initialized');
      return false;
    }
    
    // Add mentor data to Firestore
    const mentorsCollectionRef = collection(db, 'mentors');
    
    for (const mentor of mentorData) {
      const { id, ...mentorData } = mentor;
      await setDoc(doc(mentorsCollectionRef, id), {
        ...mentorData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    
    console.log('Mentor data added to Firestore successfully!');
    return true;
  } catch (error) {
    console.error('Error initializing mentor data:', error);
    return false;
  }
};

// Initialize the sample user data structure
export const initializeUserDataStructure = async (userId, userData = {}) => {
  try {
    // Initialize user profile with empty arrays for skills, interests, etc.
    const usersCollectionRef = collection(db, 'users');
    
    const defaultUserData = {
      skills: [],
      interests: [],
      careerGoals: [],
      industry: '',
      experienceLevel: 'beginner',
      bio: '',
      ...userData,
      updatedAt: serverTimestamp()
    };
    
    await setDoc(doc(usersCollectionRef, userId), defaultUserData, { merge: true });
    console.log('User data structure initialized successfully!');
    return true;
  } catch (error) {
    console.error('Error initializing user data structure:', error);
    return false;
  }
};

// Main function to initialize all Firestore data
export const initializeFirestore = async (userId = null) => {
  try {
    await initializeMentors();
    
    if (userId) {
      await initializeUserDataStructure(userId);
    }
    
    return true;
  } catch (error) {
    console.error('Error initializing Firestore:', error);
    return false;
  }
};

export default initializeFirestore;