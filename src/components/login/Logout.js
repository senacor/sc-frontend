import * as actions from '../../actions';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const Logout = props => {
  props.logout();

  return <Route render={() => <Redirect to="/login" />} />;
};

export default connect(
  state => ({}),
  {
    logout: actions.logout
  }
)(Logout);
