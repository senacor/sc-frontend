import { combineReducers } from 'redux';

const isLoadingPrs = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_PRS_REQUEST':
      return true;
    case 'FETCH_PRS_RESPONSE':
      return false;
    default:
      return state;
  }
};

const prsList = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PRS_RESPONSE':
      return action.prs;
    default:
      return state;
  }
};

const prs = combineReducers({ isLoadingPrs, prsList });

export default prs;
