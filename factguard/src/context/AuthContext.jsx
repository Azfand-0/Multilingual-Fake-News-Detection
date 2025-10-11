import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";

const AuthContext = createContext();

// Hook
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Keep user logged in on refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // Email/Pass Signup
  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // Email/Pass Login
  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // Google Login
  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

  // Logout
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, signup, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

