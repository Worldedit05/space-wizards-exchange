const password = require('./passwords.js');

module.exports = {
  user: 'postgres',
  database: 'swdestiny_trader',
  password: password.dbPassword,
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
};
