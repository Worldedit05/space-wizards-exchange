import Express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack.config.dev';

import serverConfig from './config';

const app = new Express();

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

import { match } from 'react-router';

import routes from '../client/routes';

mongoose.Promise = global.Promise;

mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Error connecting to MongoDB. Please make sure it is installed and running'); // eslint-disable-line no-console
  }
});

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connection open to ${serverConfig.mongoURL}`); // eslint-disable-line no-console
});

app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.resolve(__dirname, '..dist')));

const renderError = (err) => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = process.env.NODE_ENV !== 'production' ? `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  return renderFullPage(`Server Error${errTrace}`, {});
};

app.use((req, res, next) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }
  });
});

app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`Server is running on port: ${serverConfig.port}`); // eslint-disable-line
  }
});

export default app;
