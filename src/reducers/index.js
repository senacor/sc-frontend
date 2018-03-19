import { combineReducers } from 'redux';
import tasks from './tasks';
import editTasks from './editTasks';

const app = combineReducers({ tasks, editTasks });

export default app;
