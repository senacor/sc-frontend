import { combineReducers } from 'redux';
import { filter } from './filter';

const combineReducer = combineReducers({
  filter
});

const app = (state, action) => {
  return combineReducer(state, action);
};

export default app;
