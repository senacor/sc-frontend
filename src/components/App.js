import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CompositionNumber from './footer/CompositionNumber';
import TaskList from './task/TaskList';
import PR from './task/PR';
import './App.css';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/tasks" component={TaskList} />
      <Route path="/prs" component={PR} />
      <Route render={() => <Redirect to="/tasks" />} />
    </Switch>
    <footer className="App-center">
      <CompositionNumber />
    </footer>
  </div>
);
export default App;
