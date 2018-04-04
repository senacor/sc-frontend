import { combineReducers } from 'redux';
import tasks from './tasks';
import editTasks from './editTasks';
import prs from './prs';
import taskById from './getTask';
import errors from './errors';

const app = combineReducers({ tasks, editTasks, errors, prs, taskById });
export default app;
