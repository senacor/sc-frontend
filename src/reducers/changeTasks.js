import { combineReducers } from 'redux';

const isChanging = (state = false, action) => {
  switch (action.type) {
    case 'CHANGE_TASK':
      return true;
    case 'CHANGE_TASK_RESPONSE':
      return false;
    default:
      return state;
  }
};

const list = (state = [], action) => {
  switch (action.type) {
    case 'CHANGE_TASK_RESPONSE':
      return action.tasks;
    default:
      return state;
  }
};

const tasks = combineReducers({ isChanging, list });

export default tasks;
