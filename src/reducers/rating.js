import { combineReducers } from 'redux';

const prRating = (state = [], action) => {
  switch (action.type) {
    case 'ADD_COMMENT_RESPONSE':
      return action.prRatings;
    default:
      return state;
  }
};

const prRatings = combineReducers({ prRating });

export default prRatings;
