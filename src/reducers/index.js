import { combineReducers } from 'redux';
import tasks from './tasks';
import editTasks from './editTasks';
import prs from './prs';
import prById from './getPr';
import errors from './errors';
import isLoading from './isLoading';

const app = combineReducers({
  editTasks,
  errors,
  isLoading,
  prById,
  prs,
  tasks
});

export default app;
