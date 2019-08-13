import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import locale_en from 'react-intl/locale-data/en';
import locale_de from 'react-intl/locale-data/de';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import PrivateRoute from './privateRoute/PrivateRoute';
import PrOverviewReviewer from './pr/PrOverviewReviewer';
import AppBar from './AppBar/AppBar';
import './App.css';
import Login from './login/Login';
import Logout from './login/Logout';
import Dashboard from './dashboard/Dashboard';
import PerformanceReviewDetail from './pr/prDetail/PerformanceReviewDetail';
import OverviewPerformanceReviews from './humanResources/OverviewPerformanceReviews';
import PrOverviewEmployee from './myPerformanceReviews/PrOverviewEmployee';
import ROUTES from '../helper/routes';
import ArchivedFiles from './fileStorage/ArchivedFiles';
import messages_de from '../translations/de.json';
import messages_en from '../translations/en.json';
import senacorTheme from '../colors';
import { newContext, provideContexts } from './Context';

addLocaleData([...locale_en, ...locale_de]);

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column'
  }
};

const withAppBar = WrappedComponent => props => (
  <AppBar>
    <WrappedComponent {...props} />
  </AppBar>
);

const PrOverviewReviewerAppBar = withAppBar(PrOverviewReviewer);
const PrOverviewEmployeeAppBar = withAppBar(PrOverviewEmployee);
const PerformanceReviewDetail2WithAppBar = withAppBar(PerformanceReviewDetail);
const DashboardWithAppBar = withAppBar(Dashboard);
const OverviewPrsWithAppBar = withAppBar(OverviewPerformanceReviews);
const ArchivedFilesWithAppBar = withAppBar(ArchivedFiles);

const messages = {
  de: messages_de,
  en: messages_en
};

const determineLanguage = lang => {
  let localStorageLang = localStorage.getItem('lang');
  if (localStorageLang) {
    if (lang !== localStorageLang) {
      return localStorageLang;
    }
  }
  return lang;
};

// TODO: make ErrorContext smart? - distinguish between 500 and lower status,
// write 'es wurde Feher aufgetreten' only in case >= 500
export const ErrorContext = newContext({ hasErrors: false, message: '' });

export const MeetingContext = newContext({});
export const UserinfoContext = newContext({
  userinfo: {},
  userroles: [],
  userphoto: ''
});

const App = ({ language }) => {
  return provideContexts(
    [ErrorContext, MeetingContext, UserinfoContext],
    <IntlProvider
      locale={determineLanguage(language)}
      messages={
        determineLanguage(language) === 'de' ? messages.de : messages.en
      }
    >
      <BrowserRouter>
        <MuiThemeProvider theme={senacorTheme}>
          <div style={styles.main}>
            <Switch>
              <PrivateRoute
                exact
                path={ROUTES.DASHBOARD}
                component={DashboardWithAppBar}
              />
              <PrivateRoute
                exact
                path={ROUTES.OWN_PR_TABLE}
                component={PrOverviewEmployeeAppBar}
              />
              <PrivateRoute
                exact
                path="/myPrs/:id"
                component={PerformanceReviewDetail2WithAppBar}
              />
              <PrivateRoute
                exact
                path={ROUTES.PR_TO_REVIEW_TABLE}
                component={PrOverviewReviewerAppBar}
              />
              <PrivateRoute
                exact
                path="/prs/:id"
                component={PerformanceReviewDetail2WithAppBar}
              />
              <PrivateRoute
                exact
                path="/prDetail/:id"
                component={PerformanceReviewDetail2WithAppBar}
              />
              <PrivateRoute
                exact
                path={ROUTES.HR_PR_TABLE}
                component={OverviewPrsWithAppBar}
              />
              <PrivateRoute
                exact
                path={ROUTES.ARCHIVED_PR_TABLE}
                component={ArchivedFilesWithAppBar}
              />

              <PrivateRoute path={ROUTES.LOGOUT} component={Logout} />
              <Route path={ROUTES.LOGIN} component={Login} />
              <Route render={() => <Redirect to={ROUTES.DASHBOARD} />} />
            </Switch>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    </IntlProvider>
  );
};
export default connect(state => ({
  language: state.language
}))(App);
