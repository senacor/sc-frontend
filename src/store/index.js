import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import reducers from '../reducers';

const configurestore = () => {
  const middlewares = [thunk];

  // if (process.env.NODE_ENV !== 'production') {
  //   middlewares.push(createLogger({}));
  // }

  const composeEnhancers =
    (typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

  return createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middlewares))
  );
};

export default configurestore();
