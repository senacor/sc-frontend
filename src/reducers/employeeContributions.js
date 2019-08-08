import {
  ADD_PR_RESPONSE,
  ADD_TEXT_RESPONSE,
  FETCH_PR_BY_ID_RESPONSE,
  FETCH_PRS_RESPONSE
} from '../helper/dispatchTypes';
import cloneDeep from '../helper/cloneDeep';

export const prEmployeeContributions = (state = [], action) => {
  switch (action.type) {
    case ADD_TEXT_RESPONSE:
      return cloneDeep(
        generateEmployeeContributionsForOnePr(
          state,
          action.payload.prId,
          action.payload.prReflectionSet
        )
      );
    case FETCH_PRS_RESPONSE:
      return cloneDeep(
        generateEmployeeContributionsForMultiplePrs(state, action.prs)
      );
    default:
      return state;
  }
};

function generateMapByReflectionField(reflectionSet) {
  let result = {};

  reflectionSet.forEach(item => {
    result[item.prReflectionField] = item;
  });

  return result;
}

function generateEmployeeContributionsForOnePr(state, prId, reflectionSet) {
  return Object.assign({}, state, {
    [prId]: generateMapByReflectionField(reflectionSet)
  });
}

function generateEmployeeContributionsForMultiplePrs(state, prs) {
  let result = {};

  prs.forEach(pr => {
    result[pr.id] = generateMapByReflectionField(pr.prReflectionSet);
  });

  return Object.assign({}, state, result);
}
