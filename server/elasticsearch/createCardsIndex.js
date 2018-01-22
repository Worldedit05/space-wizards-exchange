const esClient = require('../elasticsearch/connection.js');

esClient.indices.create({ index: 'cards' }, (err, resp, status) => {
  if (err) {
    console.log(err);
  } else {
    console.log('create', resp);
    console.log('status', status);
  }
});
