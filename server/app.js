const express = require('express');
const morgan = require('morgan');
const path = require('path');

const cardRoutes = require('./routes/cards');
const searchRoutes = require('./routes/search');

const app = express();

app.use(morgan('Server_log[morgan] - :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use('/cards', cardRoutes);
app.use('/search', searchRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
