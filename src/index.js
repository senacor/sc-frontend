import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import './index.css';
import App from './components/App';
import reducers from './reducers';
import senacorTheme from './colors';
import registerServiceWorker from './registerServiceWorker';
import Error from './components/task/ErrorBoundary';

const configureStore = () => {
  const middlewares = [thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger({}));
  }

  return createStore(reducers, applyMiddleware(...middlewares));
};

ReactDOM.render(
  <BrowserRouter>
    <Provider store={configureStore()}>
      <MuiThemeProvider theme={senacorTheme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
