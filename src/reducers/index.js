import { combineReducers } from 'redux';
import { prs, sortOrderPrs, tablePrs } from './prs';
import isLoading from './isLoading';
import { appointmentsSearchResults, selectedDate } from './appointments';
import { filter } from './filter';

const combineReducer = combineReducers({
  appointmentsSearchResults,
  prs,
  tablePrs,
  isLoading,
  selectedDate,
  sortOrderPrs,
  filter
});

const app = (state, action) => {
  return combineReducer(state, action);
};

export default app;
