import { combineReducers } from 'redux';
import tasks from './tasks';
import editTasks from './editTasks';
import prs from './prs';
import prById from './getPr';
import errors from './errors';
import login from './login';
import { userinfo, userphoto, userroles } from './userinfo';
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
  prRatings,
  prEmployeeContributions,
  search,
  userinfo,
  userphoto,
  userroles
});
export default app;
