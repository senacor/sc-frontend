import { combineReducers } from 'redux';
import { prs, sortOrderPrs, tablePrs } from './prs';
import { prDetailId, newPrId } from './prDetailId';
import errors from './errors';
import login from './login';
import { language } from './language';
import { userinfo, userphoto, userroles } from './userinfo';
import isLoading from './isLoading';
import { employeeSearchResults } from './searchEmployee';
import { appointmentsSearchResults, selectedDate } from './appointments';
import { meeting } from './meetings';
import { filter } from './filter';
import { LOGIN_UNAUTHORIZED, LOGOUT } from '../helper/dispatchTypes';
import { filterPossibilities } from './filterPossibilities';
import { archivedFiles } from './archivedFiles';
import { uploadedFiles } from './uploadedFiles';
import { downloadedFile } from './downloadedFile';
import { savingThreads } from './savingThreads';

const combineReducer = combineReducers({
  appointmentsSearchResults,
  archivedFiles,
  uploadedFiles,
  downloadedFile,
  errors,
  prs,
  login,
  language,
  tablePrs,
  isLoading,
  meeting,
  prDetailId,
  newPrId,
  employeeSearchResults,
  selectedDate,
  sortOrderPrs,
  userinfo,
  userphoto,
  userroles,
  filter,
  savingThreads,
  filterPossibilities
});

const app = (state, action) => {
  if (action.type === LOGOUT || action.type === LOGIN_UNAUTHORIZED) {
    state = undefined;
  }

  return combineReducer(state, action);
};

export default app;
