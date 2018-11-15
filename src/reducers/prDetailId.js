import {
  ADD_PR_RESPONSE,
  FETCH_PR_BY_ID_RESPONSE,
  FETCH_PRS_RESPONSE,
  SET_PR_DETAIL
} from '../helper/dispatchTypes';
import cloneDeep from '../helper/cloneDeep';
import * as dispatchTypes from '../helper/dispatchTypes';

export const prDetailId = (state = 0, action) => {
  switch (action.type) {
    case FETCH_PR_BY_ID_RESPONSE: {
      return action.prById.id;
    }
    case FETCH_PRS_RESPONSE: {
      if (action.prs.length) {
        return cloneDeep(action.prs[0].id);
      }
      return state;
    }
    case SET_PR_DETAIL: {
      return cloneDeep(action.prId);
    }
    case ADD_PR_RESPONSE: {
      return cloneDeep(action.pr.id);
    }
    default:
      return state;
  }
};

export const newPrId = (state = null, action) => {
  const setNewPrId = [dispatchTypes.ADD_PR_RESPONSE];
  const unsetNewPrId = [
    dispatchTypes.FETCH_PR_BY_ID_RESPONSE,
    dispatchTypes.FETCH_PRS_RESPONSE,
    dispatchTypes.SET_PR_DETAIL
  ];

  if (findInArray(setNewPrId, action.type)) {
    return cloneDeep(action.pr.id);
  } else if (findInArray(unsetNewPrId, action.type)) {
    return null;
  }

  return state;
};

function findInArray(arr, val) {
  return arr.find(element => element === val);
}
