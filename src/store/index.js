import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import reducers from '../reducers';

const configurestore = () => {
  const middlewares = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger({}));
  }

  return createStore(reducers, applyMiddleware(...middlewares));
};

export default configurestore();
