import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, onAuthStateChanged, signInAnonymously } from "../config/firebaseConfig";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const signInAnonymousUser = async () => {
    try {
      setIsLoading(true);
      const userCredential = await signInAnonymously(auth);
      console.log("Anonymous user signed in:", userCredential.user.uid);
      return userCredential.user;
    } catch (error) {
      console.error("Error signing in anonymously:", error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
        console.log("User authenticated:", user.uid);
      } else {
        console.log("No user found, signing in anonymously...");
        try {
          await signInAnonymousUser();
        } catch (error) {
          console.error("Failed to sign in anonymously:", error);
          setIsLoading(false);
        }
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    isLoading,
    error,
    userId: user?.uid,
    isAuthenticated: !!user,
    signInAnonymousUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
