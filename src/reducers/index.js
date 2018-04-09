import { combineReducers } from 'redux';
import tasks from './tasks';
import editTasks from './editTasks';
import prs from './prs';
import prById from './getPr';
import errors from './errors';

const app = combineReducers({ tasks, editTasks, errors, prs, prById });
export default app;
