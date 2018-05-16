import { combineReducers } from 'redux';

const prDetail = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PR_BY_ID_RESPONSE':
      return action.prById;
    default:
      return state;
  }
};

const prById = combineReducers({ prDetail });

export default prById;
