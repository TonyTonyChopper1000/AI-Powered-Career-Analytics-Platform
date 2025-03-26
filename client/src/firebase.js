// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  sendEmailVerification
} from "firebase/auth";

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

// Helper to set up invisible reCAPTCHA
export const setupRecaptcha = (containerId) => {
  const recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved, you can proceed with sending OTP
    }
  });
  return recaptchaVerifier;
};

// Register new user with email and password
export const registerWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    return { user: userCredential.user, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

// Send OTP via phone number
export const sendPhoneOTP = async (phoneNumber, recaptchaVerifier) => {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    return { confirmationResult, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

// Verify OTP
export const verifyOTP = async (confirmationResult, otp) => {
  try {
    const userCredential = await confirmationResult.confirm(otp);
    return { user: userCredential.user, success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Sign out
export const signOut = async () => {
  try {
    await auth.signOut();
    return { success: true };
  } catch (error) {
    return { error: error.message, success: false };
  }
};

// Auth state observer
export const onAuthStateChanged = (callback) => {
  return auth.onAuthStateChanged(callback);
};

export default auth;