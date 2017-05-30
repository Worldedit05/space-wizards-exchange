const pg = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const config = isProduction ? require('./config.prod.js') : require('./config.local.js');

const pool = new pg.Pool(config);

pool.on('error', (err) => {
  console.error('idle client error', err.message, err.stack);
});

module.exports.query = (text, values, callback) => {
  console.log('query:', text, values);
  return pool.query(text, values, callback);
};

module.exports.connect = (callback) => {
  pool.connect(callback);
};
