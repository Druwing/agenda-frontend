import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem('jwt_token');

  if (token) {
    toast.info('Você já está autenticado.');
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthRoute;