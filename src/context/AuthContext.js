// src/context/AuthContext.js
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../app/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get, onValue } from 'firebase/database';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }
      
      // Set up a listener for the user data
      const userRef = ref(database, `users/${firebaseUser.uid}`);
      const userListener = onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        
        if (userData) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            ...userData
          });
        } else {
          // Just set the basic user data if no additional data exists yet
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            onboardingCompleted: false
          });
        }
        setLoading(false);
      });
      
      // Clean up listener when auth state changes
      return () => {
        userListener();
      };
    });

    // Clean up auth listener on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);