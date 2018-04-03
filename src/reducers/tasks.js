import { combineReducers } from 'redux';

export const isLoading = (state = false, action) => {
  const startLoading = ['FETCH_TASKS_REQUEST', 'FETCH_PRS_REQUEST'];
  const stopLoading = [
    'FETCH_TASKS_RESPONSE',
    'FETCH_PRS_RESPONSE',
    'ERROR_RESPONSE'
  ];

  if (findInArray(startLoading, action.type)) {
    return true;
  } else if (findInArray(stopLoading, action.type)) {
    return false;
  }

  return state;
};

function findInArray(arr, val) {
  return arr.find(element => element === val);
}

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
