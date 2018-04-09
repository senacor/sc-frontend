import { combineReducers } from 'redux';
import tasks from './tasks';
import editTasks from './editTasks';
import prs from './prs';
import errors from './errors';
import login from './login';

const app = combineReducers({ tasks, editTasks, errors, prs, login });
export default app;
