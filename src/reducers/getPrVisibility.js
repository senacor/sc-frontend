import { combineReducers } from 'redux';

const prVisibility = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PR_VISIBILITY_BY_ID_RESPONSE':
      return {
        toEmployee: action.prVisibilityById.visibilityToEmployee === 'VISIBLE',
        toSupervisor:
          action.prVisibilityById.visibilityToSupervisor === 'VISIBLE'
      };
    default:
      return state;
  }
};

const prVisibilityById = combineReducers({ prVisibility });

export default prVisibilityById;
