import { combineReducers } from 'redux';

const prEmployeeContribution = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TEXT_RESPONSE':
      return action.prReflectionSet;
    default:
      return state;
  }
};

const prEmployeeContributions = combineReducers({ prEmployeeContribution });

export default prEmployeeContributions;
