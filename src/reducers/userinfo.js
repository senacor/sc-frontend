import {
  FETCHED_USERINFO,
  FETCHED_USERPHOTO,
  FETCHED_USERROLES,
  LOGOUT,
  REVIEWER_INFO_RESPONSE
} from '../helper/dispatchTypes';
import cloneDeep from '../helper/cloneDeep';
import ROLES from '../helper/roles';

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
      let userId = action.payload.reviewerInfo.userId;
      let numberOfPrsToReview = action.payload.reviewerInfo.numberOfPrsToReview;
      let numberOfPrsToSupervise =
        action.payload.reviewerInfo.numberOfPrsToSupervise;
      let prsNotFilledByReviewer =
        action.payload.reviewerInfo.prsNotFilledByReviewer;
      let prsNotFilledByEmployee =
        action.payload.reviewerInfo.prsNotFilledByEmployee;
      let idOfNewestOpenPr = action.payload.reviewerInfo.idOfNewestOpenPr;
      let deadlineOfNewestOpenPr =
        action.payload.reviewerInfo.deadlineOfNewestPr;
      return Object.assign({}, userinfostate, {
        userId: userId,
        numberOfPrsToReview: numberOfPrsToReview,
        numberOfPrsToSupervise: numberOfPrsToSupervise,
        prsNotFilledByReviewer: prsNotFilledByReviewer,
        prsNotFilledByEmployee: prsNotFilledByEmployee,
        idOfNewestOpenPr: idOfNewestOpenPr,
        deadlineOfNewestOpenPr: deadlineOfNewestOpenPr,
        hasSupervisor: action.payload.reviewerInfo.hasSupervisor,
        hasPrInProgress: action.payload.reviewerInfo.hasPrInProgress
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
      return convertGroupsToArray(action.roles);
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

  return [ROLES.PR_MITARBEITER];
}
