import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { logout } from '../../actions/calls/login';

const Logout = () => {
  logout();
  return <Route render={() => <Redirect to="/login" />} />;
};

export default Logout;
