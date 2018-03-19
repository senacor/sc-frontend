import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CompositionNumber from './footer/CompositionNumber';
import TaskList from './task/TaskList';
import PR from './task/PR';
import AppBar from './AppBar/AppBar';
import './App.css';
import Login from './login/Login';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column'
  }
};

const withAppBar = WrappedComponent => () => (
  <AppBar>
    <WrappedComponent />
    <footer style={styles.footer}>
      <CompositionNumber />
    </footer>
  </AppBar>
);

const TaskListWithAppBar = withAppBar(TaskList);
const PRWithAppBar = withAppBar(PR);

const App = () => (
  <div style={styles.main}>
    <Switch>
      <Route path="/tasks" component={TaskListWithAppBar} />
      <Route path="/prs" component={PRWithAppBar} />
      <Route path="/login" component={Login} />
      <Route render={() => <Redirect to="/tasks" />} />
    </Switch>
  </div>
);

export default App;
