import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Routes from './routes';

import './index.css';

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <Routes />
  </ MuiThemeProvider>,
  document.getElementById('root') /* eslint comma-dangle: ["error", "never"]*/
);
