import {
  ADD_PR_RESPONSE,
  CHANGE_HR_COMMENT_RESPONSE,
  FETCH_PR_BY_ID_RESPONSE,
  FETCH_PRS_RESPONSE
} from '../helper/dispatchTypes';
import cloneDeep from '../helper/cloneDeep';

export const finalCommentHr = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRS_RESPONSE:
      const result = {};
      action.prs.forEach(pr => {
        result[pr.id] = pr.finalCommentHr;
      });
      return result;

    case ADD_PR_RESPONSE:
      const commentList = cloneDeep(state);
      commentList[action.pr.id] = action.pr.finalCommentHr;

      return commentList;

    case FETCH_PR_BY_ID_RESPONSE: {
      const commentList = cloneDeep(state);
      commentList[action.prById.id] = action.prById.finalCommentHr;
      return commentList;
    }

    case CHANGE_HR_COMMENT_RESPONSE: {
      const commentList = cloneDeep(state);
      commentList[action.payload.prId] = action.payload.comment;

      return commentList;
    }

    default:
      return state;
  }
};
