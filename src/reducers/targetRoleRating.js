import { FETCH_TARGETROLE_RATINGS } from '../helper/dispatchTypes';
import cloneDeep from '../helper/cloneDeep';

export const prTargetRoleRatings = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TARGETROLE_RATINGS: {
      return cloneDeep(
        generateRatingsForOnePr(
          state,
          action.payload.prId,
          action.payload.prRatings
        )
      );
    }

    default:
      return state;
  }
};

function generateRatingsForOnePr(state, prId, ratingSet) {
  return Object.assign({}, state, {
    [prId]: generateMapByDescription(ratingSet)
  });
}

function generateMapByDescription(ratings) {
  let result = {};
  ratings.forEach(rating => {
    result[rating.prRatingDescription] = rating;
  });

  return result;
}
