import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './privateRoute/PrivateRoute';
import PrOverviewReviewer from './pr/PrOverviewReviewer';
import AppBar from './AppBar/AppBar';
import CstMembers from './cstmembers/CstMembers';
import './App.css';
import Login from './login/Login';
import Logout from './login/Logout';
import Dashboard from './dashboard/Dashboard';
import PerformanceReviewDetail from './pr/prDetail/PerformanceReviewDetail';
import OverviewPerformanceReviews from './humanResources/OverviewPerformanceReviews';
import PrOverviewEmployee from './myPerformanceReviews/PrOverviewEmployee';

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
const CstMembersWithAppBar = withAppBar(CstMembers);
const DashboardWithAppBar = withAppBar(Dashboard);
const OverviewPrsWithAppBar = withAppBar(OverviewPerformanceReviews);

const App = () => (
  <div style={styles.main}>
    <Switch>
      <PrivateRoute exact path="/dashboard" component={DashboardWithAppBar} />
      <PrivateRoute exact path="/myPrs" component={PrOverviewEmployeeAppBar} />
      <PrivateRoute
        exact
        path="/myPrs/:id"
        component={PerformanceReviewDetail2WithAppBar}
      />
      <PrivateRoute exact path="/prs" component={PrOverviewReviewerAppBar} />
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
      <PrivateRoute exact path="/cstmembers" component={CstMembersWithAppBar} />
      <PrivateRoute exact path="/hr/prs" component={OverviewPrsWithAppBar} />

      <PrivateRoute path="/logout" component={Logout} />
      <Route path="/login" component={Login} />
      <Route render={() => <Redirect to="/dashboard" />} />
    </Switch>
  </div>
);

export default App;
