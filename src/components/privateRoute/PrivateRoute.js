import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const tokenExistent = !!localStorage.getItem('access_token');
  return (
    <Route
      {...rest}
      render={props => {
        return tokenExistent ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        );
      }}
    />
  );
};

export default PrivateRoute;
