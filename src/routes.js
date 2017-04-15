import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import App from './components/App';
import NotFound from './components/NotFound';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
