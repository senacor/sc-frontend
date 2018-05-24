export const isLoading = (state = false, action) => {
  const startLoading = [
    'ADD_PR_REQUEST',
    'FETCH_PR_BY_ID_REQUEST',
    'FETCH_PRS_REQUEST',
    'FETCH_TASKS_REQUEST',
    'LOGIN_REQUEST'
  ];
  const stopLoading = [
    'ADD_COMMENT_RESPONSE',
    'ADD_PR_RESPONSE',
    'ADD_TEXT_RESPONSE',
    'ERROR_RESPONSE',
    'FETCH_PR_BY_ID_RESPONSE',
    'FETCH_PRS_RESPONSE',
    'FETCH_TASKS_RESPONSE',
    'LOGIN_RESPONSE',
    'LOGIN_UNAUTHORIZED',
    'LOGOUT'
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