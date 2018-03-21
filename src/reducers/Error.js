import React from 'react';
import { combineReducers } from 'redux';

let initialState = { hasError: false };
const addError = (state = initialState, action) => {
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
