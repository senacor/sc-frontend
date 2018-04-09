import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={props => {
        return token === true.toString() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        );
      }}
    />
  );
};

export default connect(
  state => ({
    token: state.login.getToken
  }),
  {
    getToken: actions.getToken
  }
)(PrivateRoute);
