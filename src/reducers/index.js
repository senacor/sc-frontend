import { combineReducers } from 'redux';
import tasks from './tasks';
import editTasks from './editTasks';
import prs from './prs';
import errors from './errors';

const app = combineReducers({ tasks, editTasks, errors, prs });
export default app;
