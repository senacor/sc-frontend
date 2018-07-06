import { combineReducers } from 'redux';
import {
  LOGIN_RESPONSE,
  LOGOUT,
  LOGIN_UNAUTHORIZED,
  LOGIN_REQUEST
} from '../helper/dispatchTypes';
import history from '../history';

export const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case LOGIN_RESPONSE:
      return setDataInLocalStorage(action.data);
    case LOGOUT:
      return removeDataInLocalStorage();
    case LOGIN_UNAUTHORIZED:
      history.push('/login');
      return removeDataInLocalStorage();
    default:
      return state;
  }
};

export const isUnauthorized = (state = false, action) => {
  switch (action.type) {
    case LOGIN_UNAUTHORIZED:
      history.push('/login');
      return true;
    case LOGIN_RESPONSE:
      return false;
    case LOGIN_REQUEST:
      return false;
    case LOGOUT:
      return false;
    default:
      return state;
  }
};

const login = combineReducers({ isLoggedIn, isUnauthorized });

export default login;

function setDataInLocalStorage(data) {
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);

  return true;
}

function removeDataInLocalStorage() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');

  return false;
}
