import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isUnauthorized, ...rest }) => {
  const tokenExistent = !!localStorage.getItem('access_token');
  return (
    <Route
      {...rest}
      render={props => {
        return tokenExistent && !isUnauthorized ? (
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

export default connect(state => ({
  isUnauthorized: state.login.isUnauthorized
}))(PrivateRoute);
