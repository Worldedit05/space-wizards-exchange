const esClient = require('../elasticsearch/connection.js');

esClient.indices.delete({ index: 'card' }, (err, resp, status) => {
  if (err) {
    console.log(err);
  } else {
    console.log('delete', resp);
    console.log('status', status);
  }
});
