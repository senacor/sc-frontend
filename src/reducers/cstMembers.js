import { FETCHED_CSTMEMBERS } from '../helper/dispatchTypes';

export const cstMembers = (state = [], action) => {
  switch (action.type) {
    case FETCHED_CSTMEMBERS:
      return getCstMembersData(action.cstMembers);
    default:
      return state;
  }
};

function getCstMembersData(response) {
  if (
    response &&
    response._embedded &&
    response._embedded.employeeResponseList
  ) {
    return response._embedded.employeeResponseList;
  }

  return [];
}
