import React, { useEffect, useState } from 'react';
import app from '../firebase/firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    (() => {
      setLoadingUser(true);

      app.auth().onAuthStateChanged((user) => {
        setCurrentUser(user);
        setLoadingUser(false);
      });
    })();

    return () => {
      setLoadingUser(false);
      setCurrentUser(null);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loadingUser }}>
      {children}
    </AuthContext.Provider>
  );
};
