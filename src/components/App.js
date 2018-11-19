import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
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

const App = () => (
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

      <PrivateRoute path={ROUTES.LOGOUT} component={Logout} />
      <Route path={ROUTES.LOGIN} component={Login} />
      <Route render={() => <Redirect to={ROUTES.DASHBOARD} />} />
    </Switch>
  </div>
);

export default App;
