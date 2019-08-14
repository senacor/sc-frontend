import { createSelector } from 'reselect';
import moment from 'moment/moment';

export const getAllPrs = state => Object.values(state.prs);
export const getSortOrder = state => state.sortOrderPrs;
export const getAppointments = state => state.appointmentsSearchResults;
export const getSelectedDate = state => state.selectedDate;
export const isLoading = state => state.isLoading.length > 0;
export const isLoadingAction = (state, start) =>
  state.isLoading.some(entry => start.includes(entry));

export const getFilter = group => {
  return createSelector(
    [state => state.filter],
    filter => (filter[group] ? filter[group] : '')
  );
};
export const getSubFilter = (group, subfilter) => {
  return createSelector(
    [state => state.filter],
    filter => {
      return filter[group]
        ? filter[group][subfilter]
          ? filter[group][subfilter]
          : ''
        : '';
    }
  );
};

export const getSortedPrs = () => {
  return createSelector(
    [getAllPrs, getSortOrder],
    (prs, sortOrder) => Array.from(prs).sort(dateSort(sortOrder))
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
