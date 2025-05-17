import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('jwt_token');

  if (!token) {
    toast.error('Por favor, faça login para acessar esta página.');
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;