import {
  FETCH_PRS_RESPONSE,
  ADD_PR_RESPONSE,
  DELEGATE_REVIEWER_RESPONSE,
  CHANGE_SORT_ORDER,
  FETCH_PR_BY_ID_RESPONSE,
  CHANGE_RATING_TARGETROLE_RESPONSE
} from '../helper/dispatchTypes';
import generateMapById from '../helper/generateMapById';
import cloneDeep from '../helper/cloneDeep';
import objectGet from 'object-get';
import set from 'object-set';

export const prs = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PRS_RESPONSE:
      return cloneDeep(generateMapById(action.prs));
    case ADD_PR_RESPONSE:
      return cloneDeep(
        Object.assign({}, state, {
          [action.pr.id]: action.pr
        })
      );
    case DELEGATE_REVIEWER_RESPONSE: {
      let newPr = Object.assign({}, state[action.prNewReviewer.id], {
        reviewer: action.prNewReviewer.reviewer
      });
      return cloneDeep(
        Object.assign({}, state, {
          [action.prNewReviewer.id]: newPr
        })
      );
    }
    case FETCH_PR_BY_ID_RESPONSE: {
      return cloneDeep(
        Object.assign({}, state, {
          [action.prById.id]: action.prById
        })
      );
    }
    case CHANGE_RATING_TARGETROLE_RESPONSE: {
      const prId = action.payload.prId;
      const targetRoleName = action.payload.targetRoleName;
      const rating = action.payload.rating;

      const prs = cloneDeep(state);
      const targetRoleSet = objectGet(prs, `${prId}.prTargetRoleSet`);

      const indexChangedRating = targetRoleSet.findIndex(
        targetRoleInfo => targetRoleInfo.prTargetRoleName === targetRoleName
      );

      const prsUpdated = set(
        prs,
        `${prId}.prTargetRoleSet.${indexChangedRating}.rating`,
        rating
      );

      return prsUpdated;
    }

    default:
      return state;
  }
};

export const sortOrderPrs = (state = '', action) => {
  if (action.type === CHANGE_SORT_ORDER) {
    return action.sortOrder;
  }

  return 'desc';
};
