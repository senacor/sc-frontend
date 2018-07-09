import { createSelector } from 'reselect';
import moment from 'moment/moment';

export const getAllPrs = state => Object.values(state.prs);
export const getPrById = state => state.prDetail;
export const getSortOrder = state => state.sortOrderPrs;

export const getPrDetail = () => {
  return createSelector([getAllPrs, getPrById], (prs, id) => prs[id]);
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
