import { combineReducers } from 'redux';

const isLoadingPRs = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_PRS_REQUEST':
      return true;
    case 'FETCH_PRS_RESPONSE':
      return false;
    default:
      return state;
  }
};

const PRList = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PRS_RESPONSE':
      return action.prs;
    default:
      return state;
  }
};

const prs = combineReducers({ isLoadingPRs, PRList });

export default prs;
