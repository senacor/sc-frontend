import { combineReducers } from 'redux';
import tasks from './tasks';
import editTasks from './editTasks';
import prs from './prs';
import prById from './getPr';
import errors from './errors';
import login from './login';
import isLoading from './isLoading';
import supervisors from './delegatedSupervisorsList';

const app = combineReducers({
  tasks,
  editTasks,
  errors,
  prs,
  login,
  isLoading,
  prById,
  supervisors
});
export default app;
