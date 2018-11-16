import * as dispatchTypes from '../helper/dispatchTypes';
import cloneDeep from '../helper/cloneDeep';

export const isLoading = (state = { isLoading: false, action: [] }, action) => {
  const startLoading = [
    dispatchTypes.ADD_PR_REQUEST,
    dispatchTypes.FETCH_PR_BY_ID_REQUEST,
    dispatchTypes.FETCH_PRS_REQUEST,
    dispatchTypes.FETCH_OWN_PRS_REQUEST,
    dispatchTypes.FETCH_PRS_HR_REQUEST,
    dispatchTypes.FETCH_TARGETROLE_REQUEST,
    dispatchTypes.LOGIN_REQUEST,
    dispatchTypes.FETCH_MEETING_REQUEST,
    dispatchTypes.FETCH_EMPLOYEES_REQUEST
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
    dispatchTypes.LOGIN_RESPONSE,
    dispatchTypes.LOGIN_UNAUTHORIZED,
    dispatchTypes.LOGOUT
  ];

  if (findInArray(startLoading, action.type)) {
    let newState = cloneDeep(state);
    newState.action.push(action.type.replace('_REQUEST', ''));
    newState.isLoading = true;
    return newState;
  } else if (findInArray(stopLoading, action.type)) {
    let newState = cloneDeep(state);
    var index = newState.action.indexOf(action.type.replace('_RESPONSE', ''));
    if (index > -1) {
      newState.action = [];
    } else {
      newState.action.splice(index, 1);
    }
    newState.isLoading = false;
    return newState;
  }

  return state;
};

function findInArray(arr, val) {
  return arr.find(element => element === val);
}

export default isLoading;
