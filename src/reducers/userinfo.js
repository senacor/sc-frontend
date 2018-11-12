import {
  FETCHED_USERINFO,
  FETCHED_USERPHOTO,
  FETCHED_USERROLES,
  LOGOUT,
  REVIEWER_INFO_RESPONSE
} from '../helper/dispatchTypes';
import cloneDeep from '../helper/cloneDeep';

export const userinfo = (state = {}, action) => {
  switch (action.type) {
    case FETCHED_USERINFO:
      let fetchedUserinfo = Object.assign({}, action.userinfo, {
        userPrincipalName: action.userinfo.userPrincipalName.replace(
          '@polaris.senacor.com',
          ''
        )
      });
      let userinfostateForFetch = cloneDeep(state);
      return Object.assign({}, userinfostateForFetch, fetchedUserinfo);
    case REVIEWER_INFO_RESPONSE:
      const userinfostate = cloneDeep(state);
      let numberOfPrsToReview = action.payload.reviewerInfo.numberOfPrsToReview;
      let numberOfPrsToSupervise =
        action.payload.reviewerInfo.numberOfPrsToSupervise;
      return Object.assign({}, userinfostate, {
        numberOfPrsToReview: numberOfPrsToReview,
        numberOfPrsToSupervise: numberOfPrsToSupervise
      });
    default:
      return state;
  }
};

export const userphoto = (state = '', action) => {
  switch (action.type) {
    case FETCHED_USERPHOTO:
      return action.imageString;
    case LOGOUT:
      return '';
    default:
      return state;
  }
};

export const userroles = (state = [], action) => {
  switch (action.type) {
    case FETCHED_USERROLES:
      let stateForFetch = cloneDeep(state);
      let fetchedRoles = convertGroupsToArray(action.roles);
      return stateForFetch.concat(fetchedRoles);
    case REVIEWER_INFO_RESPONSE:
      let stateForReviewer = cloneDeep(state);
      let isReviewer = action.payload.reviewerInfo.numberOfPrsToReview > 0;
      if (isReviewer) {
        return stateForReviewer.concat(['PR_Reviewer']);
      }
      return stateForReviewer;
    case LOGOUT:
      return [];
    default:
      return state;
  }
};

function convertGroupsToArray(adGroups) {
  if (adGroups && adGroups.value) {
    return adGroups.value.map(group => group.displayName);
  }

  return ['PR_MITARBEITER'];
}
