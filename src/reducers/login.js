import { combineReducers } from 'redux';

const getToken = (state = false, action) => {
  switch (action.type) {
    case 'TOKEN_TRUE':
      return action.token;
    default:
      return state;
  }
};

const login = combineReducers({ getToken });

export default login;
