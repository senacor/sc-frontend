import { combineReducers } from 'redux';
import { ADD_TEXT_RESPONSE } from '../helper/dispatchTypes';

const prEmployeeContribution = (state = [], action) => {
  switch (action.type) {
    case ADD_TEXT_RESPONSE:
      return action.prReflectionSet;
    default:
      return state;
  }
};

const prEmployeeContributions = combineReducers({ prEmployeeContribution });

export default prEmployeeContributions;
