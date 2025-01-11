import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Retrieve stored users array from localStorage
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Check if the `users` array has any values
  const isAuthenticated = storedUsers.length > 0;

  // If authenticated, render the children; otherwise, navigate to login
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
