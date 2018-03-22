import { combineReducers } from 'redux';
import tasks from './tasks';
import editTasks from './editTasks';
import prs from './prs';

const app = combineReducers({ tasks, editTasks, prs });

export default app;
