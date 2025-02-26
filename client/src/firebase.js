// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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