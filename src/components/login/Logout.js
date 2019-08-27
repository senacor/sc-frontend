import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { logout } from '../../actions/calls/login';
import { UserinfoContext } from '../App';

const Logout = () => {
  const userInfoContext = useContext(UserinfoContext.context);
  logout();
  userInfoContext.setValue({
    userinfo: {},
    userroles: [],
    userphoto: ''
  });
  return <Redirect to="/login" />;
};

export default Logout;
