import { combineReducers } from 'redux';
import {
  FETCH_PRS_RESPONSE,
  ADD_PR_RESPONSE,
  DELEGATE_REVIEWER_RESPONSE
} from '../helper/dispatchTypes';

const prsList = (state = [], action) => {
  switch (action.type) {
    case FETCH_PRS_RESPONSE:
      return action.prs;
    case ADD_PR_RESPONSE:
      return [...state, action.pr];
    case DELEGATE_REVIEWER_RESPONSE:
      let indexReviewer = state.findIndex(pr => pr.id === action.prNewReviewer.id);
      return [
        ...state.slice(0, indexReviewer),
        Object.assign({}, state[indexReviewer], {
          reviewer: {
            ...action.prNewReviewer.reviewer
          }
        }),
        ...state.slice(indexReviewer + 1, state.length)
      ];

    default:
      return state;
  }
};

const prs = combineReducers({ prsList });

export default prs;
