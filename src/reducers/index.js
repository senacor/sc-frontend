import { combineReducers } from 'redux';
import tasks from './tasks';
import editTasks from './editTasks';
import { prs, sortOrderPrs } from './prs';
import { prDetail } from './prDetail';
import prById from './getPr';
import prVisibilityById from './getPrVisibility';
import errors from './errors';
import login from './login';
import { userinfo, userphoto, userroles } from './userinfo';
import { cstMembers } from './cstMembers';
import { prRatings } from './rating';
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
  prDetail,
  prVisibilityById,
  prRatings,
  prEmployeeContributions,
  search,
  sortOrderPrs,
  userinfo,
  userphoto,
  userroles,
  cstMembers
});
export default app;
