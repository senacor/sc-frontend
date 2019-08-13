import { combineReducers } from 'redux';
import { prs, sortOrderPrs, tablePrs } from './prs';
import { prDetailId, newPrId } from './prDetailId';
import login from './login';
import { language } from './language';
import isLoading from './isLoading';
import { appointmentsSearchResults, selectedDate } from './appointments';
import { filter } from './filter';
import { LOGIN_UNAUTHORIZED, LOGOUT } from '../helper/dispatchTypes';

const combineReducer = combineReducers({
  appointmentsSearchResults,
  prs,
  login,
  language,
  tablePrs,
  isLoading,
  prDetailId,
  newPrId,
  selectedDate,
  sortOrderPrs,
  filter
});

const app = (state, action) => {
  if (action.type === LOGOUT || action.type === LOGIN_UNAUTHORIZED) {
    state = undefined;
  }

  return combineReducer(state, action);
};

export default app;
