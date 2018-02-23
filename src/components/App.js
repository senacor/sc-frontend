import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CompositionNumber from './footer/CompositionNumber';
import TaskList from './task/TaskList';
import './App.css';

const App = () => (
  <div>
    <Switch>
      <Route path="/tasks" component={TaskList} />
      <Route render={() => <Redirect to="/tasks" />} />
    </Switch>
    <footer className="App-center">
      <CompositionNumber />
    </footer>
  </div>
);

export default App;
