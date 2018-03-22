import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CompositionNumber from './footer/CompositionNumber';
import TaskList from './task/TaskList';
import PRList from './pr/PRList';
import AppBar from './AppBar/AppBar';
import './App.css';
import IndividualPr from './pr/Pr';

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
        <Route exact path="/prs" component={PRList} />
        <Route exact path="/prs/:id" component={IndividualPr} />
        <Route render={() => <Redirect to="/tasks" />} />
      </Switch>
      <footer style={styles.footer}>
        <CompositionNumber />
      </footer>
    </AppBar>
  </div>
);

export default App;
