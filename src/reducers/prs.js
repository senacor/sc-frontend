import { combineReducers } from 'redux';

const prsList = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PRS_RESPONSE':
      return action.prs;
    default:
      return state;
  }
};
const addPr = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PR_RESPONSE':
      return action.pr;
    default:
      return state;
  }
};

const prs = combineReducers({ prsList, addPr });

export default prs;
