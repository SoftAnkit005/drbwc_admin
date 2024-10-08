import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const isValidToken = (token) => {
  // Basic check for a JWT structure (header.payload.signature)
  const jwtPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
  return jwtPattern.test(token);
};

const ProtectedRoute = ({ component: Component }) => {
  const authToken = localStorage.getItem('authAdminToken');
  const isUserLoggedIn = authToken && isValidToken(authToken);
  
  return isUserLoggedIn ? <Component /> : <Navigate to="/auth/login" />;
};

// Add PropTypes validation
ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;

