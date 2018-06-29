import { combineReducers } from 'redux';

const isChangingVisibility = (state = false, action) => {
  switch (action.type) {
    case 'EDIT_PR_VISIBILITY_REQUEST':
      return true;
    case 'EDIT_PR_VISIBILITY_RESPONSE':
      return false;
    default:
      return state;
  }
};

const editVisibility = combineReducers({ isChangingVisibility });

export default editVisibility;
