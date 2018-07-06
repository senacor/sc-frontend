import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import './index.css';
import App from './components/App';
import store from './store';
import { Router } from 'react-router-dom';
import history from './history';

import senacorTheme from './colors';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <MuiThemeProvider theme={senacorTheme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </Router>,

  document.getElementById('root')
);
registerServiceWorker();
