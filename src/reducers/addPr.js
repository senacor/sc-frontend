import { combineReducers } from 'redux';

const addingPrs = (state = false, action) => {
  switch (action.type) {
    case 'ADD_PR_REQUEST':
      return true;
    case 'ADD_PR_RESPONSE':
      return false;
    default:
      return state;
  }
};

const listPrs = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PR_RESPONSE':
      return action.prs;
    default:
      return state;
  }
};

const prs = combineReducers({ addingPrs, listPrs });

export default prs;
