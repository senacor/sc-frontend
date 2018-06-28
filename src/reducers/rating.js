import { combineReducers } from 'redux';
import { ADD_COMMENT_RESPONSE } from '../helper/dispatchTypes';

const prRating = (state = [], action) => {
  switch (action.type) {
    case ADD_COMMENT_RESPONSE:
      return action.prRatings;
    default:
      return state;
  }
};

const prRatings = combineReducers({ prRating });

export default prRatings;
