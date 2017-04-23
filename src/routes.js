import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './components/App';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import NotFound from './components/NotFound';

const Routes = () => (
    <Router>
      <div>
        <Route component={NavBar} />
        <Switch>
          <Route path="/" exact component={App} />
          <Route exact path="/user/:username" component={Profile} />
          <Route exact path="/user/:username/edit" component={Profile} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </ Router>
);

export default Routes;
