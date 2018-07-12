import {
  ADD_COMMENT_RESPONSE,
  FETCH_PR_BY_ID_RESPONSE,
  FETCH_PRS_RESPONSE
} from '../helper/dispatchTypes';
import cloneDeep from '../helper/cloneDeep';

export const prRatings = (state = {}, action) => {
  switch (action.type) {
    case ADD_COMMENT_RESPONSE: {
      return cloneDeep(
        generateRatingsForOnePr(
          state,
          action.payload.prId,
          action.payload.prRatings
        )
      );
    }

    case FETCH_PR_BY_ID_RESPONSE: {
      let pr = action.prById;
      return cloneDeep(generateRatingsForOnePr(state, pr.id, pr.prRatingSet));
    }

    case FETCH_PRS_RESPONSE: {
      let { prs } = action;
      let result = generateRatingsForMultiplePrs(state, prs);
      return cloneDeep(result);
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

function generateRatingsForMultiplePrs(state, prs) {
  let result = {};

  prs.forEach(pr => {
    result[pr.id] = generateMapByDescription(pr.prRatingSet);
  });

  return Object.assign({}, state, result);
}
