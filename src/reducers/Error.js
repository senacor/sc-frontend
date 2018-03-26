import { combineReducers } from 'redux';

const addError = (state = false, action) => {
  switch (action.type) {
    case 'ERROR_RESPONSE':
      return action.hasError;
    case 'ERROR_GONE':
      return action.hasError;
    default:
      return state;
  }
};

const error = combineReducers({ addError });

export default error;
