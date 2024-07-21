import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('adminToken'); // Check for token

    return isAuthenticated ? Component : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
