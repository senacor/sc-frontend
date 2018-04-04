import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import TaskList from './task/TaskList';
import PRList from './pr/PRList';
import AppBar from './AppBar/AppBar';
import './App.css';
import Login from './login/Login';
import PR from './pr/Pr';

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

const TaskListWithAppBar = withAppBar(TaskList);
const PRListWithAppBar = withAppBar(PRList);
const PRWithAppBar = withAppBar(PR);

const App = () => (
  <div style={styles.main}>
    <Switch>
      <Route path="/tasks" component={TaskListWithAppBar} />
      <Route exact path="/prs" component={PRListWithAppBar} />
      <Route exact path="/prs/:id" component={PRWithAppBar} />
      <Route path="/login" component={Login} />
      <Route render={() => <Redirect to="/tasks" />} />
    </Switch>
  </div>
);

export default App;
