import { combineReducers } from 'redux';
import { prs, sortOrderPrs, tablePrs } from './prs';
import login from './login';
import { language } from './language';
import isLoading from './isLoading';
import { filter } from './filter';
import { LOGIN_UNAUTHORIZED, LOGOUT } from '../helper/dispatchTypes';

const combineReducer = combineReducers({
  prs,
  login,
  language,
  tablePrs,
  isLoading,
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
