import { createSelector } from 'reselect';

export const getAllPrs = state => Object.values(state.prs);
export const getSelectedDate = state => state.selectedDate;

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
