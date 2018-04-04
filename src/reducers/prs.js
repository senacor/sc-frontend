import { combineReducers } from 'redux';

const prsList = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PRS_RESPONSE':
      return [...state, { type: action.type, prs: action.prs }];
    case 'ADD_PR_RESPONSE':
      return [...state, { type: action.type, pr: action.pr }];
    default:
      return state;
  }
};

const prs = combineReducers({ prsList });

export default prs;
