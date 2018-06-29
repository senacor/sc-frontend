import { combineReducers } from 'redux';
import { FETCH_TASKS_RESPONSE } from '../helper/dispatchTypes';

const list = (state = [], action) => {
  switch (action.type) {
    case FETCH_TASKS_RESPONSE:
      return action.tasks;
    default:
      return state;
  }
};

const tasks = combineReducers({ list });

export default tasks;
