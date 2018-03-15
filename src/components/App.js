import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CompositionNumber from './footer/CompositionNumber';
import TaskList from './task/TaskList';
import PR from './task/PR';
import AppBar from './AppBar/AppBar';
import './App.css';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column'
  }
};

const App = () => (
  <div style={styles.main}>
    <AppBar>
      <Switch>
        <Route path="/tasks" component={TaskList} />
        <Route path="/prs" component={PR} />
        <Route render={() => <Redirect to="/tasks" />} />
      </Switch>
      <footer style={styles.footer}>
        <CompositionNumber />
      </footer>
    </AppBar>
  </div>
);

export default App;
