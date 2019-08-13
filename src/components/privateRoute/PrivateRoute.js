import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthorizationContext } from '../App';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authorizationContext = useContext(AuthorizationContext.context);

  const tokenExistent = !!localStorage.getItem('access_token');
  return (
    <Route
      {...rest}
      render={props => {
        return tokenExistent && !authorizationContext.value ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
