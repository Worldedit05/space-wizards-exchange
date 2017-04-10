import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import App from './components/App';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
