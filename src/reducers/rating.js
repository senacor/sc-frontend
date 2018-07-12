import {
  ADD_COMMENT_RESPONSE,
  FETCH_PR_BY_ID_RESPONSE
} from '../helper/dispatchTypes';
import cloneDeep from '../helper/cloneDeep';

export const prRatings = (state = {}, action) => {
  switch (action.type) {
    case ADD_COMMENT_RESPONSE: {
      let ratingMap = generateMapByDescription(action.payload.prRatings);
      return cloneDeep(
        constructRatingMapToPrId(action.payload.prId, ratingMap)
      );
    }

    case FETCH_PR_BY_ID_RESPONSE: {
      let pr = action.prById;
      let ratingMap = generateMapByDescription(pr.prRatingSet);
      return cloneDeep(constructRatingMapToPrId(pr.id, ratingMap));
    }
    default:
      return state;
  }
};

function constructRatingMapToPrId(prId, ratingMap) {
  return {
    [prId]: ratingMap
  };
}

function generateMapByDescription(ratings) {
  return ratings.map(rating => {
    return {
      [rating.prRatingDescription]: rating
    };
  });
}
