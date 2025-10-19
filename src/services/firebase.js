// ✅ Import required Firebase SDKs
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 👈 ADD THIS

// ✅ Firebase Config (keep it as is or use env vars)
const firebaseConfig = {
  apiKey: "AIzaSyByXH6nDq9rzBrRUjQFJMp--QjTDLNh6zQ",
  authDomain: "mindcure-student.firebaseapp.com",
  projectId: "mindcure-student",
  storageBucket: "mindcure-student.firebasestorage.app",
  messagingSenderId: "438571600815",
  appId: "1:438571600815:web:8fe8640ff1519524923d5a",
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Auth setup
export const auth = getAuth(app);

// 🔥 Firestore setup (✅ this is the missing part)
export const db = getFirestore(app);

// 👤 Watch for auth state changes
export const watchAuth = (callback) => onAuthStateChanged(auth, callback);

// 🔑 Sign in with Google
export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await setPersistence(auth, browserLocalPersistence);
    return await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("❌ Google login failed:", error);
    throw error;
  }
};

// 🔓 Logout
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("❌ Logout failed:", error);
    throw error;
  }
};

// (Optional) Export app if needed
export default app;
