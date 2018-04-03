import { combineReducers } from 'redux';
import tasks from './tasks';
import editTasks from './editTasks';
import prs from './prs';
import errors from './errors';
import addPrs from './addPr';

const app = combineReducers({ tasks, editTasks, errors, prs, addPrs });
export default app;
