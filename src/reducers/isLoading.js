import * as dispatchTypes from '../helper/dispatchTypes';
import cloneDeep from '../helper/cloneDeep';

export const isLoading = (state = [], action) => {
  const startLoading = [
    dispatchTypes.ADD_PR_REQUEST,
    dispatchTypes.FETCH_PR_BY_ID_REQUEST,
    dispatchTypes.FETCH_PRS_REQUEST,
    dispatchTypes.FETCH_OWN_PRS_REQUEST,
    dispatchTypes.FETCH_PRS_HR_REQUEST,
    dispatchTypes.FETCH_TARGETROLE_REQUEST,
    dispatchTypes.LOGIN_REQUEST,
    dispatchTypes.FETCH_MEETING_REQUEST,
    dispatchTypes.FILTER_POSSIBILITIES_REQUEST,
    dispatchTypes.FETCH_EMPLOYEES_REQUEST,
    dispatchTypes.DOWNLOAD_FILES_INFORMATION_REQUEST,
    dispatchTypes.UPLOAD_FILES_REQUEST
  ];
  const stopLoading = [
    dispatchTypes.ADD_COMMENT_RESPONSE,
    dispatchTypes.ADD_PR_RESPONSE,
    dispatchTypes.ADD_TEXT_RESPONSE,
    dispatchTypes.ERROR_RESPONSE,
    dispatchTypes.FETCH_PR_BY_ID_RESPONSE,
    dispatchTypes.FETCH_PRS_RESPONSE,
    dispatchTypes.FETCH_OWN_PRS_RESPONSE,
    dispatchTypes.FETCH_PRS_HR_RESPONSE,
    dispatchTypes.FETCH_TARGETROLE_RESPONSE,
    dispatchTypes.FETCH_MEETING_RESPONSE,
    dispatchTypes.FETCH_EMPLOYEES_RESPONSE,
    dispatchTypes.FILTER_POSSIBILITIES_RESPONSE,
    dispatchTypes.LOGIN_RESPONSE,
    dispatchTypes.LOGIN_UNAUTHORIZED,
    dispatchTypes.LOGOUT,
    dispatchTypes.DOWNLOAD_FILES_INFORMATION_RESPONSE,
    dispatchTypes.UPLOAD_FILES_RESPONSE
  ];

  let actionTrigger = action.type.replace('_REQUEST', '');
  if (
    findInArray(startLoading, action.type) &&
    !findInArray(state, actionTrigger)
  ) {
    let newState = cloneDeep(state);

    newState.push(action.type.replace('_REQUEST', ''));
    return newState;
  } else if (findInArray(stopLoading, action.type)) {
    let newState = cloneDeep(state);
    let index = newState.indexOf(action.type.replace('_RESPONSE', ''));
    if (index < 0) {
      newState = [];
    } else {
      newState.splice(index, 1);
    }
    return newState;
  }

  return state;
};

function findInArray(arr, val) {
  return arr.find(element => element === val);
}

export default isLoading;
