const cardRoutes = require('./cards');
const searchRoutes = require('./search');
const accountRoutes = require('./account');

module.exports = (app) => {
  app.use('/api/cards', cardRoutes);
  app.use('/api/search', searchRoutes);
  app.use('/api/account', accountRoutes);
};
