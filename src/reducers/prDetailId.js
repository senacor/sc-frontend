import {
  FETCH_PR_BY_ID_RESPONSE,
  FETCH_PRS_RESPONSE,
  SET_PR_DETAIL
} from '../helper/dispatchTypes';

export const prDetailId = (state = 0, action) => {
  switch (action.type) {
    case FETCH_PR_BY_ID_RESPONSE: {
      return action.prById.id;
    }
    case FETCH_PRS_RESPONSE: {
      if (action.prs.length) {
        return action.prs[0].id;
      }
      return state;
    }
    case SET_PR_DETAIL: {
      return action.prId;
    }
    default:
      return state;
  }
};
