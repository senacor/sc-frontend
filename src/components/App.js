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
import VersionDialog from './VersionDialog';

// Routes
const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const ActiveEmployeesContainer = lazy(() =>
  import('./AllEmployees/ActiveEmployeesContainer')
);
const FormerEmployeesContainer = lazy(() =>
  import('./AllEmployees/FormerEmployeesContainer')
);
const OwnScsContainer = lazy(() => import('./scs/ownScs/OwnScsContainer'));
const ProcessingScsContainer = lazy(() =>
  import('./scs/processingScs/ProcessingScContainer')
);
const ScorecardDetail = lazy(() => import('./scs/ScorecardDetail'));
const Login = lazy(() => import('./login/Login'));
const UserRolesPanel = lazy(() => import('./admin/UserRolesPanel'));
const SystemPanel = lazy(() => import('./admin/System'));
const MaintenancePanel = lazy(() => import('./admin/MaintenanceContainer'));
const AutomationRulesContainer = lazy(() =>
  import('./admin/automationRules/AutomationRulesContainer')
);
const PayrollReportsPanel = lazy(() =>
  import('./admin/payrollreports/PayrollReportsPanel')
);

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
    <VersionDialog />
    <WrappedComponent {...props} />
  </Content>
);

const ProcessingScsContainerWithContent = withContent(ProcessingScsContainer);
const OwnScsContainerWithContent = withContent(OwnScsContainer);
const ScorecardDetail2WithContent = withContent(ScorecardDetail);
const DashboardWithContent = withContent(Dashboard);
const ActiveEmployeesContainerWithContent = withContent(
  ActiveEmployeesContainer
);
const FormerEmployeesContainerWithContent = withContent(
  FormerEmployeesContainer
);
const UserRolesPanelWithContent = withContent(UserRolesPanel);
const SystemPanelWithContent = withContent(SystemPanel);
const MaintenancePanelWithContent = withContent(MaintenancePanel);
const AutomationRulesWithContent = withContent(AutomationRulesContainer);
const PayrollReportsWithContent = withContent(PayrollReportsPanel);

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
export const VersionContext = newContext(false);
export const AuthorizationContext = newContext({
  unauthorized: false,
  invalidCredentials: false
});
// TODO: make ErrorContext smart? - distinguish between 500 and lower status,
// write 'es wurde Feher aufgetreten' only in case >= 500
export const ErrorContext = newContext({
  hasErrors: false,
  messageId: '',
  errors: {}
});
export const InfoContext = newContext({ hasInfos: false, messageId: '' });

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
      UserinfoContext,
      LanguageContext,
      VersionContext
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
                      path={ROUTES.SC_HR_TODO}
                      component={DashboardWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.SC_IN_PROGRESS}
                      component={DashboardWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.INITIALIZATION}
                      component={DashboardWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.IN_PROGRESS}
                      component={DashboardWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.READY_TO_CLOSE}
                      component={DashboardWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.DONE}
                      component={DashboardWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.ARCHIVED}
                      component={DashboardWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.NEW_EMPLOYEES}
                      component={DashboardWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.PLANNED_LEAVINGS}
                      component={DashboardWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.DECLINED_PR}
                      component={DashboardWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.OWN_SCS}
                      component={OwnScsContainerWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.SC_TO_REVIEW_TABLE}
                      component={ProcessingScsContainerWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.SC_DETAIL}
                      component={ScorecardDetail2WithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.ACTIVE_EMPLOYEES_TABLE}
                      component={ActiveEmployeesContainerWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={'/employeeScs/:id'}
                      component={ActiveEmployeesContainerWithContent}
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
                      path={ROUTES.ACTIVE_EMPLOYEES_TABLE}
                      component={ActiveEmployeesContainerWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.MAINTENANCE}
                      component={MaintenancePanelWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.AUTORULES}
                      component={AutomationRulesWithContent}
                    />
                    <PrivateRoute
                      exact
                      path={ROUTES.PAYROLL_REPORTS}
                      component={PayrollReportsWithContent}
                    />
                    {/*<PrivateRoute*/}
                    {/*exact*/}
                    {/*path={ROUTES.DATABASE_PATCHES}*/}
                    {/*component={DatabasePatchesPanelWithContent}*/}
                    {/*/>*/}
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
