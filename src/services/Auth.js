import React, { useEffect, useState } from "react";
import app from "../firebase/firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const getUserStatus = async () => {
      await app.auth().onAuthStateChanged(setCurrentUser);
    };

    getUserStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
