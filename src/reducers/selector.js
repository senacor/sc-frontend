import { createSelector } from 'reselect';
import moment from 'moment/moment';

export const getAllPrs = state => Object.values(state.prs);
export const getAllPrsForTable = state => Object.values(state.tablePrs);
export const getActualPrId = state => state.prDetailId;
export const getSortOrder = state => state.sortOrderPrs;
export const getUserroles = state => state.userroles;
export const getUserinfo = state => state.userinfo;
export const getUserPrincipalName = state => state.userinfo.userPrincipalName;
export const getAppointments = state => state.appointmentsSearchResults;
export const getSelectedDate = state => state.selectedDate;
export const getMeeting = state => state.meeting;
export const getFilterPossibilities = state => state.filterPossibilities;
export const isLoading = state => state.isLoading.length > 0;
export const isLoadingAction = (state, start) =>
  state.isLoading.some(entry => start.includes(entry));
export const getArchivedFiles = state => state.archivedFiles;
export const getUploadedFiles = state => state.uploadedFiles;
export const getDownloadedFile = state => state.downloadedFile;
export const getSavingThreads = state => state.savingThreads;

export const getPrDetail = () => {
  return createSelector(
    [state => state.prs, getActualPrId],
    (prs, prDetail) => prs[prDetail]
  );
};

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
