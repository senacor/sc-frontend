import { combineReducers } from 'redux';

const isChanging = (state = false, action) => {
  switch (action.type) {
    case 'EDIT_TASK_REQUEST':
      return true;
    case 'EDIT_TASK_RESPONSE':
      return false;
    default:
      return state;
  }
};

const list = (state = [], action) => {
  switch (action.type) {
    case 'EDIT_TASK_RESPONSE':
      return action.task;
    default:
      return state;
  }
};

const tasks = combineReducers({ isChanging, list });

export default tasks;
