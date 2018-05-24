import { combineReducers } from 'redux';

export const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case 'LOGIN_RESPONSE':
      return setDataInLocalStorage(action.data);
    case 'LOGOUT':
      return removeDataInLocalStorage();
    case 'LOGIN_UNAUTHORIZED':
      return removeDataInLocalStorage();
    default:
      return state;
  }
};

export const isUnauthorized = (state = false, action) => {
  switch (action.type) {
    case 'LOGIN_UNAUTHORIZED':
      return true;
    case 'LOGIN_RESPONSE':
      return false;
    case 'LOGIN_REQUEST':
      return false;
    case 'LOGOUT':
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

  return !!localStorage.getItem('access_token');
}

function removeDataInLocalStorage() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');

  return false;
}
