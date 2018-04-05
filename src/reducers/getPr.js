import { combineReducers } from 'redux';

export const getPr = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_PR_BY_ID_REQUEST':
      return true;
    case 'ERROR_RESPONSE':
      return false;
    case 'FETCH_PR_BY_ID_RESPONSE':
      return false;
    default:
      return state;
  }
};

const returnPr = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PR_BY_ID_RESPONSE':
      return action.prById;
    default:
      return state;
  }
};

const prById = combineReducers({ getPr, returnPr });

export default prById;
