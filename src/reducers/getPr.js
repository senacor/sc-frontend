import { combineReducers } from 'redux';

const prDetail = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PR_BY_ID_RESPONSE':
      return action.prById;

    case 'ADD_COMMENT_RESPONSE':
      return action.prById;
    default:
      return [];
  }
};

const prById = combineReducers({ prDetail });

export default prById;
