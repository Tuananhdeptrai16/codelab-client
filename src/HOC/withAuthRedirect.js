import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../services/shared/Cookies';
import { AUTH_KEY_OTP } from '../services/shared/constant';

const withAuthRedirect = (WrappedComponent) => {
  return (props) => {
    const isVerified = getCookie(AUTH_KEY_OTP);

    if (!isVerified) {
      return <Navigate to="/forgot-password" replace />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthRedirect;
