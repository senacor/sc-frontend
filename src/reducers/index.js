import { combineReducers } from 'redux';
import tasks from './tasks';
import editTasks from './editTasks';
import prs from './prs';
import prById from './getPr';
import prVisibilityById from './getPrVisibility';
import errors from './errors';
import login from './login';
import { userinfo, userphoto, userroles } from './userinfo';
import { cstMembers } from './cstMembers';
import { events } from './events';
import prRatings from './rating';
import isLoading from './isLoading';
import search from './searchEmployee';
import prEmployeeContributions from './employeeContributions';

const app = combineReducers({
  tasks,
  editTasks,
  errors,
  prs,
  login,
  isLoading,
  prById,
  prVisibilityById,
  prRatings,
  prEmployeeContributions,
  search,
  userinfo,
  userphoto,
  cstMembers,
  userroles,
  events
});
export default app;
