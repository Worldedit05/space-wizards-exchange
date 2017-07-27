const express = require('express');

const cardRoutes = require('./cards');
const searchRoutes = require('./search');
const accountRoutes = require('./account');

module.exports = (app) => {
  const router = express.Router();

  router.use('/cards', cardRoutes);
  router.use('/search', searchRoutes);
  router.use('/account', accountRoutes);

  app.use('/api', router);
};
