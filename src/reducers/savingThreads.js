import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_RESPONSE,
  ADD_TEXT_REQUEST,
  ADD_TEXT_RESPONSE,
  CHANGE_ADVANCEMENT_STRATEGIES_REQUEST,
  CHANGE_ADVANCEMENT_STRATEGIES_RESPONSE,
  CHANGE_FINAL_COMMENT_REQUEST,
  CHANGE_FINAL_COMMENT_RESPONSE,
  CHANGE_HR_COMMENT_REQUEST,
  CHANGE_HR_COMMENT_RESPONSE,
  CHANGE_RATING_TARGETROLE_REQUEST,
  CHANGE_RATING_TARGETROLE_RESPONSE
} from '../helper/dispatchTypes';

export const savingThreads = (state = 0, action) => {
  switch (action.type) {
    case ADD_COMMENT_REQUEST:
      return (state += 1);
    case ADD_COMMENT_RESPONSE:
      return (state -= 1);
    case CHANGE_ADVANCEMENT_STRATEGIES_REQUEST:
      return (state += 1);
    case CHANGE_ADVANCEMENT_STRATEGIES_RESPONSE:
      return (state -= 1);
    case ADD_TEXT_REQUEST:
      return (state += 1);
    case ADD_TEXT_RESPONSE:
      return (state -= 1);
    case CHANGE_HR_COMMENT_REQUEST:
      return (state += 1);
    case CHANGE_HR_COMMENT_RESPONSE:
      return (state -= 1);
    case CHANGE_FINAL_COMMENT_REQUEST:
      return (state += 1);
    case CHANGE_FINAL_COMMENT_RESPONSE:
      return (state -= 1);
    case CHANGE_RATING_TARGETROLE_REQUEST:
      return (state += 1);
    case CHANGE_RATING_TARGETROLE_RESPONSE:
      return (state -= 1);
    default:
      return state;
  }
};
