import { combineReducers } from 'redux';

const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case 'TOKEN_TRUE':
      return true;

    case 'TOKEN_FALSE':
      return false;
    default:
      return state;
  }
};

const login = combineReducers({ isLoggedIn });

export default login;
