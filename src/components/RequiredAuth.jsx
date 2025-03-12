import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import endpoints from '../contants/Endpoint';

const RequireAuth = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={endpoints.auth.login} />;
  }

  return children;
};

export default RequireAuth;