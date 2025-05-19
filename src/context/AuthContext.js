import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    setToken(storedToken);
    setIsAuthenticated(!!storedToken);
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const links = isAuthenticated
    ? [
        { to: "/home", label: "Home" },
        { to: "/trackinglist", label: "My Tracklist" },
        { to: "/addProduct", label: "Track New" },
        { to: "/account", label: "Account" },
        { to: "/contact", label: "Contact" },
      ]
    : [
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact" },
      ];

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
