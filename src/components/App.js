import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './privateRoute/PrivateRoute';
import TaskList from './task/TaskList';
import PRList from './pr/PRList';
import AppBar from './AppBar/AppBar';
import './App.css';
import Login from './login/Login';
import PR from './pr/Pr';
import Logout from './login/Logout';

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
const PRWithAppBar = withAppBarExtendedHeader(PR);

const App = () => (
  <div style={styles.main}>
    <Switch>
      <PrivateRoute path="/tasks" component={TaskListWithAppBar} />
      <PrivateRoute exact path="/myPrs" component={PRListWithAppBar} />
      <PrivateRoute exact path="/prs" component={PRListWithAppBar} />
      <PrivateRoute exact path="/prs/:id" component={PRWithAppBar} />
      <PrivateRoute path="/logout" component={Logout} />
      <Route path="/login" component={Login} />
      <Route render={() => <Redirect to="/tasks" />} />
    </Switch>
  </div>
);

export default App;
