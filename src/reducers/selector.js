import { createSelector } from 'reselect';
import moment from 'moment/moment';

export const getAllPrs = state => Object.values(state.prs);
export const getPrById = state => state.prDetailId;
export const getSortOrder = state => state.sortOrderPrs;
export const getUserroles = state => state.userroles;
export const getAppointments = state => state.appointmentsSearchResults;

export const getPrDetail = () => {
  return createSelector(
    [state => state.prs, getPrById],
    (prs, prDetail) => prs[prDetail]
  );
};

export const getPrEmployeeContributions = type => {
  return createSelector(
    [state => state.prEmployeeContributions, getPrById],
    (employeeContributions, prDetailId) =>
      employeeContributions[prDetailId][type]
  );
};

export const getPrRatings = type => {
  return createSelector(
    [state => state.prRatings, getPrById],
    (prRatings, prDetailId) => prRatings[prDetailId][type]
  );
};

export const getSortedPrs = () => {
  return createSelector([getAllPrs, getSortOrder], (prs, sortOrder) =>
    Array.from(prs).sort(dateSort(sortOrder))
  );
};

function dateSort(sortOrder) {
  return (firstPR, secondPR) => {
    let comparison = 0;
    if (moment(firstPR.deadline).isBefore(moment(secondPR.deadline))) {
      comparison = 1;
    } else if (moment(firstPR.deadline).isAfter(moment(secondPR.deadline))) {
      comparison = -1;
    }
    return sortOrder === 'asc' ? comparison * -1 : comparison;
  };
}
