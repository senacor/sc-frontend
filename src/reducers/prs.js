import { combineReducers } from 'redux';
import { isLoading } from './tasks';

const prsList = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PRS_RESPONSE':
      return action.prs;
    default:
      return state;
  }
};

const prs = combineReducers({ isLoading, prsList });

export default prs;
