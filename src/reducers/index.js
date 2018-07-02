import { combineReducers } from 'redux';
import tasks from './tasks';
import editVisibility from './editPrVisibility';
import editTasks from './editTasks';
import prs from './prs';
import prById from './getPr';
import prVisibilityById from './getPrVisibility';
import errors from './errors';
import login from './login';
import { userinfo, userphoto, userroles } from './userinfo';
import { cstMembers } from './cstMembers';
import prRatings from './rating';
import isLoading from './isLoading';
import search from './searchEmployee';
import prEmployeeContributions from './employeeContributions';

const app = combineReducers({
  tasks,
  editVisibility,
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
  userroles,
  cstMembers
});
export default app;
