import { combineReducers } from 'redux';
import objectGet from 'object-get';
import * as dispatchTypes from '../helper/dispatchTypes';
import * as visibilityTypes from '../helper/prVisibility';

export const prVisibility = (
  state = { toEmployee: false, toSupervisor: false },
  action
) => {
  switch (action.type) {
    case dispatchTypes.FETCHED_PR_VISIBILITY:
      return {
        toEmployee:
          objectGet(action, 'prVisibilityById.visibilityToEmployee') ===
          visibilityTypes.VISIBLE,
        toSupervisor:
          objectGet(action, 'prVisibilityById.visibilityToReviewer') ===
          visibilityTypes.VISIBLE
      };
    default:
      return state;
  }
};

const prVisibilityById = combineReducers({ prVisibility });

export default prVisibilityById;
