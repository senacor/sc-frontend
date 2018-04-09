import * as actions from '../../actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.props.logout();

    this.state = {
      token: props.token
    };
  }

  render() {
    return <Route render={() => <Redirect to="/login" />} />;
  }
}

export default connect(
  state => ({
    token: state.login.isLoggedIn
  }),
  {
    logout: actions.logout
  }
)(Logout);