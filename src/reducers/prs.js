import {
  FETCH_PRS_RESPONSE,
  ADD_PR_RESPONSE,
  DELEGATE_REVIEWER_RESPONSE,
  CHANGE_SORT_ORDER,
  FETCH_PR_BY_ID_RESPONSE
} from '../helper/dispatchTypes';
import generateMapById from '../helper/generateMapById';
import cloneDeep from '../helper/cloneDeep';

export const prs = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRS_RESPONSE:
      return cloneDeep(generateMapById(action.prs));
    case ADD_PR_RESPONSE:
      return cloneDeep(
        Object.assign({}, state, {
          [action.pr.id]: action.pr
        })
      );
    case DELEGATE_REVIEWER_RESPONSE: {
      let newPr = Object.assign({}, state[action.prNewReviewer.id], {
        reviewer: action.prNewReviewer.reviewer
      });
      return cloneDeep(
        Object.assign({}, state, {
          [action.prNewReviewer.id]: newPr
        })
      );
    }
    case FETCH_PR_BY_ID_RESPONSE: {
      return cloneDeep(
        Object.assign({}, state, {
          [action.prById.id]: action.prById
        })
      );
    }
    default:
      return state;
  }
};

export const sortOrderPrs = (state = '', action) => {
  if (action.type === CHANGE_SORT_ORDER) {
    return action.sortOrder;
  }

  return 'desc';
};
