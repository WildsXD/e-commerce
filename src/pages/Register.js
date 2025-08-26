import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from './Login';

// Register component that redirects to Login page with register tab active
const Register = () => {
  return <Navigate to="/login" replace />;
};

export default Register;