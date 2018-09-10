import { combineReducers } from 'redux';
import tasks from './tasks';
import editTasks from './editTasks';
import { prs, sortOrderPrs } from './prs';
import { prDetailId } from './prDetailId';
import prById from './getPr';
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
import search from './searchEmployee';
import { prEmployeeContributions } from './employeeContributions';
import { appointmentsSearchResults } from './appointments';
import { selectedDate } from './appointments';
import { meeting } from './meetings';

const combineReducer = combineReducers({
  appointmentsSearchResults,
  tasks,
  editTasks,
  errors,
  prs,
  login,
  isLoading,
  meeting,
  prById,
  prDetailId,
  prTargetRole,
  prVisibilityById,
  prFinalizationStatusById,
  prRatings,
  prEmployeeContributions,
  search,
  selectedDate,
  sortOrderPrs,
  userinfo,
  userphoto,
  userroles,
  cstMembers,
  events
});

const app = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return combineReducer(state, action);
};

export default app;
