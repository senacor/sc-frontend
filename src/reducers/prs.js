import { combineReducers } from 'redux';
import {
  FETCH_PRS_RESPONSE,
  ADD_PR_RESPONSE,
  ADD_SUPERVISOR,
  CHANGE_SORT_ORDER
} from '../helper/dispatchTypes';
import moment from 'moment/moment';

function dateSort(sortOrder) {
  return (firstPR, secondPR) => {
    let comparison = 0;
    if (moment(firstPR.deadline).isBefore(moment(secondPR.deadline))) {
      comparison = 1;
    } else if (moment(firstPR.deadline).isAfter(moment(secondPR.deadline))) {
      comparison = -1;
    }
    return sortOrder === 'asc' ? comparison * -1 : comparison;
  };
}

const prsList = (state = [], action) => {
  switch (action.type) {
    case FETCH_PRS_RESPONSE:
      return action.prs;
    case ADD_PR_RESPONSE:
      return [...state, action.pr];
    case ADD_SUPERVISOR: {
      let index = state.findIndex(pr => pr.id === action.prId);

      return [
        ...state.slice(0, index),
        Object.assign(state[index], {
          delegatedSupervisor: action.delegatedSupervisor
        }),
        ...state.slice(index + 1, state.length)
      ];
    }
    case CHANGE_SORT_ORDER: {
      return [...state].sort(dateSort(action.sortOrder));
    }
    default:
      return state;
  }
};

const prs = combineReducers({ prsList });

export default prs;
