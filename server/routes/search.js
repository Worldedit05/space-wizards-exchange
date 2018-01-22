const Router = require('express-promise-router');
const esClient = require('../elasticsearch/connection.js');

const router = new Router();

router.get('/', (req, res) => {
  if (!req.query.q) {
    return res.status(400).send('Please provide a query parameter');
  }

  esClient.search({
    index: 'card',
    type: 'cardData',
    body: {
      size: 18,
      query: {
        match: {
          name: {
            query: `${req.query.q}`.toLowerCase(),
            fuzziness: 2,
            prefix_length: 1,
            max_expansions: 75,
            fuzzy_transpositions: true,
          },
        },
      },
    },
  }, (error, response) => {
    if (error) {
      console.log(`search error: ${error}`);
      return res.json('Internal Server Error').status(500);
    }

    let searchResponse = [];
    if (response != null) {
      searchResponse = response.hits.hits.map((data) => data._source);
    }

    return res.json(searchResponse).status(200);
  });

  return {};
});

module.exports = router;
