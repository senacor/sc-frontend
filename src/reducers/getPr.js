import { combineReducers } from 'redux';
import {
  CHANGE_FINAL_COMMENT_RESPONSE,
  FETCH_PR_BY_ID_RESPONSE
} from '../helper/dispatchTypes';
import set from 'object-set';
import cloneDeep from '../helper/cloneDeep';

const prDetail = (state = [], action) => {
  switch (action.type) {
    case FETCH_PR_BY_ID_RESPONSE:
      return action.prById;
    case CHANGE_FINAL_COMMENT_RESPONSE: {
      const comment = action.payload.comment;

      return set(cloneDeep(state), `finalCommentEmployee`, comment);
    }
    default:
      return state;
  }
};

const prById = combineReducers({ prDetail });

export default prById;
