import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import './index.css';
import App from './components/App';
import store from './store';

import senacorTheme from './colors';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <MuiThemeProvider theme={senacorTheme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
