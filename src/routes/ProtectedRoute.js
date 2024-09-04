import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ component: Component }) => {
  const isUserLoggedIn = !!localStorage.getItem('authToken');
  return isUserLoggedIn ? <Component /> : <Navigate to="/auth/login" />;
};

// Add PropTypes validation
ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
