const pg = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const config = isProduction ? require('./configs/config.prod.js') : require('./configs/config.local.js');

const pool = new pg.Pool(config);

pool.on('error', (err) => {
  console.error('idle client error', err.message, err.stack);
});

module.exports = {
  query: (text, params) => {
    console.log('query:', text, params);
    return pool.query(text, params);
  },
};

module.exports.connect = (callback) => {
  pool.connect(callback);
};
