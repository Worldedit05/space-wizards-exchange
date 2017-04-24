const express = require('express');
const morgan = require('morgan');
const path = require('path');

const mongoose = require('mongoose');
const Promise = require('bluebird');

const isProduction = process.env.NODE_ENV === 'production';

const config = isProduction ? require('./config.prod.js') : require('./config.local.js');

const mongoLocalConn = `mongodb://${config.mongo.hostname}:${config.mongo.port}/${config.mongo.database}`;
const mongoConnection = process.env.MONGODB_URI || mongoLocalConn;

const app = express();

app.use(morgan('Server_log[morgan] - :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

mongoose.Promise = Promise;

mongoose.connect(mongoConnection, () => {
  console.log(`\nMongo connection successful\nURI= ${mongoConnection}`);
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.log(`Mongoose Error: ${error}`);
});

db.once('open', () => {
  console.log('Mongoose is up and running!');
});

module.exports = app;
