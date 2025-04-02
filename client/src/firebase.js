import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseAuthStateChanged
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc 
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEcylsVegC2J7SFo47gMUn5-Xn0hyAEbE",
  authDomain: "aipoweredcareeranalytics.firebaseapp.com",
  projectId: "aipoweredcareeranalytics",
  storageBucket: "aipoweredcareeranalytics.firebasestorage.app",
  messagingSenderId: "1066426928488",
  appId: "1:1066426928488:web:f4ca2633c3a38665b61add",
  measurementId: "G-RJPLPVR6PF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Register new user with email and password
export const registerWithEmailAndPassword = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Store additional user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email,
      role: userData.role || "user",
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone || "",
      createdAt: new Date().toISOString(),
    });
    
    // Send email verification
    await sendEmailVerification(user);
    
    return { user, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.data();
    
    return { 
      user,
      userData,
      emailVerified: user.emailVerified, 
      success: true 
    };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

// Get current user
export const getCurrentUser = async () => {
  const user = auth.currentUser;
  if (!user) return null;
  
  try {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    return {
      ...user,
      ...userDoc.data()
    };
  } catch (error) {
    console.error("Error getting user data:", error);
    return user;
  }
};

// Resend verification email
export const resendVerificationEmail = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user is currently signed in");
  
  try {
    await sendEmailVerification(user);
    return { success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

// Sign out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

// Auth state observer
export const onAuthStateChanged = (callback) => {
  return firebaseAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        callback({
          ...user,
          ...userDoc.data()
        });
      } catch (error) {
        console.error("Error in auth state change:", error);
        callback(user);
      }
    } else {
      callback(null);
    }
  });
};

export { auth, db };