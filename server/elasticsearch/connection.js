const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error',
});

module.exports = client;
