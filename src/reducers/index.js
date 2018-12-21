import { combineReducers } from 'redux';
import { prs, sortOrderPrs, tablePrs } from './prs';
import { prDetailId, newPrId } from './prDetailId';
import prTargetRole from './getTargetRole';
import prFinalizationStatusById from './getPrFinalizationStatus';
import errors from './errors';
import login from './login';
import { userinfo, userphoto, userroles } from './userinfo';
import { prRatings } from './rating';
import isLoading from './isLoading';
import { employeeSearchResults } from './searchEmployee';
import { prEmployeeContributions } from './employeeContributions';
import { appointmentsSearchResults, selectedDate } from './appointments';
import { meeting } from './meetings';
import { finalCommentEmployee } from './finalCommentEmployee';
import { finalCommentHr } from './finalCommentHr';
import { filter } from './filter';
import { requiredFields } from './requiredFields';
import { LOGIN_UNAUTHORIZED, LOGOUT } from '../helper/dispatchTypes';
import { prTabs } from './prTabs';
import { filterPossibilities } from './filterPossibilities';
import { archivedFiles } from './archivedFiles';
import { uploadedFiles } from './uploadedFiles';
import { downloadedFile } from './downloadedFile';
import { advancementStrategies } from './advancementStrategies';

const combineReducer = combineReducers({
  appointmentsSearchResults,
  archivedFiles,
  uploadedFiles,
  downloadedFile,
  errors,
  prs,
  login,
  tablePrs,
  isLoading,
  meeting,
  prDetailId,
  newPrId,
  prTargetRole,
  prFinalizationStatusById,
  prRatings,
  finalCommentEmployee,
  finalCommentHr,
  advancementStrategies,
  prEmployeeContributions,
  employeeSearchResults,
  selectedDate,
  sortOrderPrs,
  userinfo,
  userphoto,
  userroles,
  filter,
  requiredFields,
  filterPossibilities,
  prTabs
});

const app = (state, action) => {
  if (action.type === LOGOUT || action.type === LOGIN_UNAUTHORIZED) {
    state = undefined;
  }

  return combineReducer(state, action);
};

export default app;
