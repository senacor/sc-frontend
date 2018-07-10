import { FETCH_PR_BY_ID_RESPONSE } from '../helper/dispatchTypes';

export const prDetail = (state = 0, action) => {
  switch (action.type) {
    case FETCH_PR_BY_ID_RESPONSE: {
      return action.prById.id;
    }
    default:
      return state;
  }
};
