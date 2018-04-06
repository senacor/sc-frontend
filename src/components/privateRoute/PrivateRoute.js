import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Login from '../login/Login';

const checkAuth = () => {
  if (Login.token) {
    console.log('tu sam');
    return true;
  }
  console.log('tu sam pogresno');

  return false;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
    }
  />
);

export default PrivateRoute;
