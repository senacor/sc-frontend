import { combineReducers } from 'redux';
import tasks from './tasks';
import editTasks from './editTasks';
import prs from './prs';
import error from './Error';
import taskById from './getTask';

const app = combineReducers({ tasks, editTasks, error, prs, taskById });
export default app;
