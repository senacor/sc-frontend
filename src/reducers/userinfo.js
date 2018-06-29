import {
  FETCHED_USERINFO,
  FETCHED_USERPHOTO,
  FETCHED_USERROLES,
  LOGOUT
} from '../helper/dispatchTypes';

export const userinfo = (state = {}, action) => {
  switch (action.type) {
    case FETCHED_USERINFO:
      return action.userinfo;
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

  return ['PR_MITARBEITER'];
}
