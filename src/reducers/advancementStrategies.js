import {
  ADD_PR_RESPONSE,
  CHANGE_ADVANCEMENT_STRATEGIES_RESPONSE,
  FETCH_PR_BY_ID_RESPONSE,
  FETCH_PRS_RESPONSE
} from '../helper/dispatchTypes';
import cloneDeep from '../helper/cloneDeep';

export const advancementStrategies = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRS_RESPONSE:
      const result = {};
      action.prs.forEach(pr => {
        result[pr.id] = pr.advancementStrategies;
      });
      return result;

    case ADD_PR_RESPONSE:
      const commentList = cloneDeep(state);
      commentList[action.pr.id] = action.pr.advancementStrategies;

      return commentList;

    case FETCH_PR_BY_ID_RESPONSE: {
      const commentList = cloneDeep(state);
      commentList[action.prById.id] = action.prById.advancementStrategies;
      return commentList;
    }

    case CHANGE_ADVANCEMENT_STRATEGIES_RESPONSE: {
      const commentList = cloneDeep(state);
      commentList[action.payload.prId] = action.payload.advancementStrategies;

      return commentList;
    }

    default:
      return state;
  }
};
