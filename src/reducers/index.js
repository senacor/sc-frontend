import { combineReducers } from 'redux';
import { prs, sortOrderPrs, tablePrs } from './prs';
import isLoading from './isLoading';
import { filter } from './filter';

const combineReducer = combineReducers({
  prs,
  tablePrs,
  isLoading,
  sortOrderPrs,
  filter
});

const app = (state, action) => {
  return combineReducer(state, action);
};

export default app;
