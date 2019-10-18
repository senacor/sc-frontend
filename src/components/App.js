import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import locale_en from 'react-intl/locale-data/en';
import locale_de from 'react-intl/locale-data/de';
import { MuiThemeProvider } from '@material-ui/core/styles';
import PrivateRoute from './privateRoute/PrivateRoute';
import '../styles/App.css';
import Logout from './login/Logout';
import ROUTES from '../helper/routes';
import messages_de from '../translations/de.json';
import messages_en from '../translations/en.json';
import senacorTheme from '../styles/colors';
import { newContext, provideContexts } from './Context';
import Content from './AppBar/Content';

// Routes
const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const AllEmployeesContainer = lazy(() =>
  import('./AllEmployees/AllEmployeesContainer')
);
const FormerEmployeesContainer = lazy(() =>
  import('./AllEmployees/FormerEmployeesContainer')
);
const OwnPrsContainer = lazy(() =>
  import('./myPerformanceReviews/OwnPrsContainer')
);
const PrsForProcessingContainer = lazy(() =>
  import('./processingPrs/ProcessingPrsContainer')
);
const PerformanceReviewDetail = lazy(() =>
  import('./pr/PerformanceReviewDetail')
);
const InactivePerformanceReviewDetail = lazy(() =>
  import('./pr/InactivePerformanceReviewDetail')
);
const Login = lazy(() => import('./login/Login'));
const UserRolesPanel = lazy(() => import('./admin/UserRolesPanel'));
const SystemPanel = lazy(() => import('./admin/System'));
const MaintenancePanel = lazy(() => import('./admin/MaintenanceContainer'));

// AppBar
const AppBarPR = lazy(() => import('./AppBar/AppBarPR'));

addLocaleData([...locale_en, ...locale_de]);

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column'
  }
};

const withContent = WrappedComponent => props => (
  <Content>
    <AppBarPR />
    <WrappedComponent {...props} />
  </Content>
);

const PrsForProcessingContainerWithContent = withContent(
  PrsForProcessingContainer
);
const OwnPrsContainerWithContent = withContent(OwnPrsContainer);
const PerformanceReviewDetail2WithContent = withContent(
  PerformanceReviewDetail
);
const InactivePerformanceReviewDetail2WithContent = withContent(
  InactivePerformanceReviewDetail
);
const DashboardWithContent = withContent(Dashboard);
const AllEmployeesContainerWithContent = withContent(AllEmployeesContainer);
const FormerEmployeesContainerWithContent = withContent(
  FormerEmployeesContainer
);
const UserRolesPanelWithContent = withContent(UserRolesPanel);
const SystemPanelWithContent = withContent(SystemPanel);
const MaintenancePanelWithContent = withContent(MaintenancePanel);

export const messages = {
  de: messages_de,
  en: messages_en
};

export const determineLanguage = lang => {
  let localStorageLang = localStorage.getItem('lang');
  if (localStorageLang) {
    if (lang !== localStorageLang) {
      return localStorageLang;
    }
  }
  return lang;
};

export const LanguageContext = newContext('de');
export const AuthorizationContext = newContext(false);
// TODO: make ErrorContext smart? - distinguish between 500 and lower status,
// write 'es wurde Feher aufgetreten' only in case >= 500
export const ErrorContext = newContext({
  hasErrors: false,
  messageId: '',
  errors: {}
});
export const InfoContext = newContext({ hasInfos: false, messageId: '' });

export const MeetingContext = newContext({});
export const PrContext = newContext({});
export const UserinfoContext = newContext({
  userinfo: {},
  userroles: [],
  userphoto: ''
});

const App = () => {
  return provideContexts(
    [
      AuthorizationContext,
      ErrorContext,
      InfoContext,
      MeetingContext,
      UserinfoContext,
      PrContext,
      LanguageContext
    ],
    <LanguageContext.context.Consumer>
      {context => (
        <IntlProvider
          locale={determineLanguage(context.value)}
          messages={
            determineLanguage(context.value) === 'de'
              ? messages.de
              : messages.en
          }
        >
          <BrowserRouter>
            <MuiThemeProvider theme={senacorTheme}>
              <Suspense fallback={null}>
                <div style={styles.main}>
                  <Switch>
                    <PrivateRoute
                      exact
                      path={ROUTES.DASHBOARD}
                      component={DashboardWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.PR_IN_PROGRESS}
                      component={DashboardWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.PR_HR_TODO}
                      component={DashboardWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.DECLINED_PR}
                      component={DashboardWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.OWN_PR_TABLE}
                      component={OwnPrsContainerWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.PR_TO_REVIEW_TABLE}
                      component={PrsForProcessingContainerWithContent}
                    />
                    <PrivateRoute
                      exact
                      path="/prs/:id"
                      component={PerformanceReviewDetail2WithContent}
                    />
                    <PrivateRoute
                      exact
                      path="/prDetail/:id"
                      component={PerformanceReviewDetail2WithContent}
                    />
                    <PrivateRoute
                      exact
                      path="/prDetailInactive/:id"
                      component={InactivePerformanceReviewDetail2WithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.ALL_PRS_TABLE}
                      component={AllEmployeesContainerWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.FORMER_EMPLOYEES}
                      component={FormerEmployeesContainerWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.ADMIN_USER_ROLES}
                      component={UserRolesPanelWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.ADMIN_SYSTEM_PANEL}
                      component={SystemPanelWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.MAINTENANCE}
                      component={MaintenancePanelWithContent}
                    />
                    <PrivateRoute
                      exact
                      path="/prDetailWithoutAppbar/:id"
                      component={PerformanceReviewDetail}
                    />
                    <PrivateRoute path={ROUTES.LOGOUT} component={Logout} />
                    <Route
                      path={ROUTES.LOGIN}
                      component={props => <Login {...props} />}
                    />
                    <Route render={() => <Redirect to={ROUTES.DASHBOARD} />} />
                  </Switch>
                </div>
              </Suspense>
            </MuiThemeProvider>
          </BrowserRouter>
        </IntlProvider>
      )}
    </LanguageContext.context.Consumer>
  );
};
export default App;
