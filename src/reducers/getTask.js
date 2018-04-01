import { combineReducers } from 'redux';

export const getTask = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_TASK_BY_ID_REQUEST':
      return true;
    case 'ERROR_RESPONSE':
      return false;
    case 'FETCH_TASK_BY_ID_RESPONSE':
      return false;
    default:
      return state;
  }
};

const returnTask = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_TASK_BY_ID_RESPONSE':
      return action.taskById;
    default:
      return state;
  }
};

const taskById = combineReducers({ getTask, returnTask });

export default taskById;
