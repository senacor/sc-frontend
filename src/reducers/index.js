import { combineReducers } from 'redux';
import tasks from './tasks';
import editTasks from './editTasks';
import error from './Error';

const app = combineReducers({ tasks, editTasks, error });
export default app;
