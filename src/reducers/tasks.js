import { combineReducers } from 'redux';

export const isLoading = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_TASKS_REQUEST':
      return true;
    case 'ERROR_RESPONSE':
      return false;
    case 'FETCH_TASKS_RESPONSE':
      return false;
    default:
      return state;
  }
};

const list = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_TASKS_RESPONSE':
      return action.tasks;
    default:
      return state;
  }
};

const tasks = combineReducers({ isLoading, list });

export default tasks;
