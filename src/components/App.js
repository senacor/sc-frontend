import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './privateRoute/PrivateRoute';
import TaskList from './task/TaskList';
import PRList from './pr/PRList';
import PROverviewReviewer from './pr/PROverviewReviewer';
import AppBar from './AppBar/AppBar';
import CstMembers from './cstmembers/CstMembers';
import SchedulingView from './scheduling/SchedulingView';
import './App.css';
import Login from './login/Login';
import PR from './pr/Pr';
import Logout from './login/Logout';
import Dashboard from './dashboard/Dashboard';
import MyPerformanceReviews from './myPerformanceReviews/MyPerformanceReviews';
import PerformanceReviewDetail from './pr/prDetail/PerformanceReviewDetail';
import OverviewPerformanceReviews from './humanResources/OverviewPerformanceReviews';

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

const withAppBarExtendedHeader = WrappedComponent => props => (
  <AppBar extendedHeader={true}>
    <WrappedComponent {...props} />
  </AppBar>
);

const TaskListWithAppBar = withAppBar(TaskList);
const PRListWithAppBar = withAppBar(PRList);
const PROverviewWithAppBar = withAppBar(PROverviewReviewer);
const MyPRListWithAppBar = withAppBar(MyPerformanceReviews);
const PerformanceReviewDetail2WithAppBar = withAppBar(PerformanceReviewDetail);
const PRWithAppBar = withAppBarExtendedHeader(PR);
const CstMembersWithAppBar = withAppBar(CstMembers);
const DashboardWithAppBar = withAppBar(Dashboard);
const SchedulingViewWithAppBar = withAppBar(SchedulingView);
const OverviewPrsWithAppBar = withAppBar(OverviewPerformanceReviews);

const App = () => (
  <div style={styles.main}>
    <Switch>
      <PrivateRoute path="/tasks" component={TaskListWithAppBar} />
      <PrivateRoute exact path="/dashboard" component={DashboardWithAppBar} />
      <PrivateRoute exact path="/myPrs" component={MyPRListWithAppBar} />
      <PrivateRoute exact path="/myPrs/:id" component={PRWithAppBar} />
      <PrivateRoute exact path="/prs_old" component={PRListWithAppBar} />
      <PrivateRoute exact path="/prs" component={PROverviewWithAppBar} />
      <PrivateRoute exact path="/prs/:id" component={PRWithAppBar} />
      <PrivateRoute
        exact
        path="/prDetail/:id"
        component={PerformanceReviewDetail2WithAppBar}
      />
      <PrivateRoute exact path="/cstmembers" component={CstMembersWithAppBar} />
      <PrivateRoute exact path="/hr/prs" component={OverviewPrsWithAppBar} />
      <PrivateRoute
        exact
        path="/prs/:id/scheduling"
        component={SchedulingViewWithAppBar}
      />
      <PrivateRoute path="/logout" component={Logout} />
      <Route path="/login" component={Login} />
      <Route render={() => <Redirect to="/dashboard" />} />
    </Switch>
  </div>
);

export default App;
