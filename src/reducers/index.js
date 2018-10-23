import { combineReducers } from 'redux';
import tasks from './tasks';
import editTasks from './editTasks';
import { prs, sortOrderPrs, tablePrs } from './prs';
import { prDetailId } from './prDetailId';
import prTargetRole from './getTargetRole';
import prVisibilityById from './getPrVisibility';
import prFinalizationStatusById from './getPrFinalizationStatus';
import errors from './errors';
import login from './login';
import { userinfo, userphoto, userroles } from './userinfo';
import { cstMembers } from './cstMembers';
import { events } from './events';
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
import { reviewerInfo } from './reviewerInfo';

const combineReducer = combineReducers({
  appointmentsSearchResults,
  tasks,
  editTasks,
  errors,
  prs,
  login,
  tablePrs,
  isLoading,
  meeting,
  prDetailId,
  prTargetRole,
  prVisibilityById,
  prFinalizationStatusById,
  prRatings,
  finalCommentEmployee,
  finalCommentHr,
  prEmployeeContributions,
  employeeSearchResults,
  selectedDate,
  sortOrderPrs,
  userinfo,
  userphoto,
  userroles,
  cstMembers,
  events,
  filter,
  requiredFields,
  reviewerInfo
});

const app = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return combineReducer(state, action);
};

export default app;
