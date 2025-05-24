import { createContext, useState, useEffect } from "react";
import { getUserFromToken } from "../services/authService";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Method to check token expiration and handle logout
  const checkTokenExpiration = () => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
          toast.info("Session expired. Please sign in again.", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
            toastId: "session-expired",
          });

          logout();
          return true;
        }
      } catch (err) {
        toast.info("Session expired. Please sign in again.", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          toastId: "session-expired",
        });
        
        logout();
        return true;
      }
    }
    return false;
  };

  // Check token expiration on token change
  useEffect(() => {
    checkTokenExpiration();
  }, [token]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setIsAuthenticated(!!storedToken);

    if (storedToken) {
      setUser(getUserFromToken(storedToken));
    } else {
      setUser(null);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    setIsAuthenticated(true);
    setUser(getUserFromToken(token));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        token,
        user,
        checkTokenExpiration,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
