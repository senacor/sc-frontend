import { combineReducers } from 'redux';
import tasks from './tasks';
import editTasks from './editTasks';
import prs from './prs';
import error from './Error';

const app = combineReducers({ tasks, editTasks, error, prs });
export default app;
