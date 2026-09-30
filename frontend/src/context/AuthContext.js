import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(
    () => localStorage.getItem("userEmail") || ""
  );
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || ""
  );

  const login = (email, newToken) => {
    localStorage.setItem("userEmail", email);
    localStorage.setItem("token", newToken);
    setUserEmail(email);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");
    setUserEmail("");
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ userEmail, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
