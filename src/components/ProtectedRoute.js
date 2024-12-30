import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if the token exists in local storage

  // If no token, redirect to sign-in page
  if (!token) {
    return <Navigate to="/signin" />;
  }

  // If token exists, render the children (protected page)
  return children;
};

export default ProtectedRoute;
