import { combineReducers } from 'redux';
import { FETCH_TARGETROLE_RESPONSE } from '../helper/dispatchTypes';

const prGetTargetRole = (state = [], action) => {
  switch (action.type) {
    case FETCH_TARGETROLE_RESPONSE:
      return action.targetRole;
    default:
      return state;
  }
};

const prTargetRole = combineReducers({ prGetTargetRole });

export default prTargetRole;
