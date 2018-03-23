import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CompositionNumber from './footer/CompositionNumber';
import TaskList from './task/TaskList';
import PRList from './pr/PRList';
import AppBar from './AppBar/AppBar';
import './App.css';
import Login from './login/Login';
import IndividualPr from './pr/Pr';

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
const PRWithAppBar = withAppBar(PRList);

const App = () => (
  <div style={styles.main}>
    <Switch>
      <Route path="/tasks" component={TaskListWithAppBar} />
      <Route exact path="/prs" component={PRWithAppBar} />
      <Route exact path="/prs/:id" component={IndividualPr} />
      <Route path="/login" component={Login} />
      <Route render={() => <Redirect to="/tasks" />} />
    </Switch>
  </div>
);

export default App;
