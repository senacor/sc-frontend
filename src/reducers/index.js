import { combineReducers } from 'redux';
import tasks from './tasks';

const app = combineReducers({ tasks });

export default app;
