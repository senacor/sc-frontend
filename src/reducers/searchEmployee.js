import { FETCH_EMPLOYEES_RESPONSE } from '../helper/dispatchTypes';

export const employeeSearchResults = (state = [], action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES_RESPONSE:
      return action.employees;
    default:
      return state;
  }
};
