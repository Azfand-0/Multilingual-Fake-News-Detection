// Firebase setup
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1CGEXISF3oKpNftkPgynbX-iJzvAF46Q",
  authDomain: "fakenewsauth-3db3d.firebaseapp.com",
  projectId: "fakenewsauth-3db3d",
  storageBucket: "fakenewsauth-3db3d.firebasestorage.app",
  messagingSenderId: "906464698969",
  appId: "1:906464698969:web:6b12bb116733f8c1b38748",
  measurementId: "G-MK3BTYXB90",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

