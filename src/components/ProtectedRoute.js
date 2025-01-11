import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const isAuthenticated = storedUsers.length > 0;

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
