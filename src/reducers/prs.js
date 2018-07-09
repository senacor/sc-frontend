import {
  FETCH_PRS_RESPONSE,
  ADD_PR_RESPONSE,
  DELEGATE_REVIEWER_RESPONSE,
  CHANGE_SORT_ORDER
} from '../helper/dispatchTypes';

function generateMap(prs) {
  const result = {};
  prs.forEach(pr => {
    result[pr.id] = pr;
  });

  return result;
}

export const prs = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRS_RESPONSE:
      return generateMap(action.prs);
    case ADD_PR_RESPONSE:
      return Object.assign({}, state, {
        [action.pr.id]: action.pr
      });
    case DELEGATE_REVIEWER_RESPONSE: {
      let newPr = Object.assign({}, state[action.prNewReviewer.id], {
        reviewer: action.prNewReviewer.reviewer
      });
      return Object.assign({}, state, {
        [action.prNewReviewer.id]: newPr
      });
    }
    default:
      return state;
  }
};

export const sortOrderPrs = (state = '', action) => {
  if (action.type === CHANGE_SORT_ORDER) {
    return action.sortOrder;
  }

  return 'asc';
};
