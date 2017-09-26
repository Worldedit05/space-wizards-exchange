import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './components/App';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import Register from './components/Register';

const Routes = () => (
  <Router>
    <div>
      <Route component={NavBar} />
      <Switch>
        <Route path="/" exact component={App} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/account/:username" component={Profile} />
        <Route exact path="/account/:username/edit" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </ Router>
);

export default Routes;
