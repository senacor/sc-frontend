import * as dispatchTypes from '../helper/dispatchTypes';

export const isLoading = (state = false, action) => {
  const startLoading = [
    dispatchTypes.ADD_PR_REQUEST,
    dispatchTypes.CHANGE_RATING_TARGETROLE_REQUEST,
    dispatchTypes.FETCH_PR_BY_ID_REQUEST,
    dispatchTypes.FETCH_PRS_REQUEST,
    dispatchTypes.FETCH_TARGETROLE_REQUEST,
    dispatchTypes.FETCH_TASKS_REQUEST,
    dispatchTypes.LOGIN_REQUEST,
    dispatchTypes.FETCH_MEETING_REQUEST
  ];
  const stopLoading = [
    dispatchTypes.ADD_COMMENT_RESPONSE,
    dispatchTypes.ADD_PR_RESPONSE,
    dispatchTypes.ADD_TEXT_RESPONSE,
    dispatchTypes.CHANGE_RATING_TARGETROLE_RESPONSE,
    dispatchTypes.ERROR_RESPONSE,
    dispatchTypes.FETCH_PR_BY_ID_RESPONSE,
    dispatchTypes.FETCH_PRS_RESPONSE,
    dispatchTypes.FETCH_TARGETROLE_RESPONSE,
    dispatchTypes.FETCH_TASKS_RESPONSE,
    dispatchTypes.FETCH_MEETING_RESPONSE,
    dispatchTypes.LOGIN_RESPONSE,
    dispatchTypes.LOGIN_UNAUTHORIZED,
    dispatchTypes.LOGOUT
  ];

  if (findInArray(startLoading, action.type)) {
    return true;
  } else if (findInArray(stopLoading, action.type)) {
    return false;
  }

  return state;
};

function findInArray(arr, val) {
  return arr.find(element => element === val);
}

export default isLoading;
