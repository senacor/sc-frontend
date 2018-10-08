import {
  ADD_PR_RESPONSE,
  CHANGE_FINAL_COMMENT_RESPONSE,
  FETCH_PR_BY_ID_RESPONSE,
  FETCH_PRS_RESPONSE
} from '../helper/dispatchTypes';
import cloneDeep from '../helper/cloneDeep';

export const finalCommentEmployee = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRS_RESPONSE:
      const result = {};
      action.prs.forEach(pr => {
        result[pr.id] = pr.finalCommentEmployee;
      });
      return result;

    case ADD_PR_RESPONSE:
      const commentList = cloneDeep(state);
      commentList[action.pr.id] = action.pr.finalCommentEmployee;

      return commentList;

    case FETCH_PR_BY_ID_RESPONSE: {
      const commentList = cloneDeep(state);
      commentList[action.prById.id] = action.prById.finalCommentEmployee;
      return commentList;
    }

    case CHANGE_FINAL_COMMENT_RESPONSE: {
      const commentList = cloneDeep(state);
      commentList[action.payload.prId] = action.payload.comment;

      return commentList;
    }

    default:
      return state;
  }
};
