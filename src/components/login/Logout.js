import React from 'react';
import { Redirect } from 'react-router-dom';
import { logout } from '../../actions/calls/login';

const Logout = () => {
  logout();
  return <Redirect to="/login" />;
};

export default Logout;
