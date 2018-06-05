import { combineReducers } from 'redux';

const prSearchResults = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_EMPLOYEES_RESPONSE':
      return action.employees;
    default:
      return state;
  }
};

const search = combineReducers({ prSearchResults });

export default search;
