import { combineReducers } from 'redux';
import tasks from './tasks';
import editTasks from './editTasks';
import prs from './prs';
import error from './Error';
import addPrs from './addPr';

const app = combineReducers({ tasks, editTasks, error, prs, addPrs });
export default app;
