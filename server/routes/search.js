const Router = require('express-promise-router');
const esClient = require('../elasticsearch/connection.js');

const db = require('../db.js');

const router = new Router();

router.get('/', async (req, res) => {
  if (!req.query.q) {
    return res.status(400).send('Please provide a query parameter');
  }

  esClient.search({
    index: 'cards',
    type: 'cardData',
    body: {
      query: {
        match: {
          name: {
            query: `${req.query.q}`,
            fuzziness: 2,
            prefix_length: 1,
          },
        },
      },
    },
  }, (error, response) => {
    if (error) {
      console.log(`search error: ${error}`);
      return res.json('Internal Server Error').status(500);
    } else if (response != null) {
      const searchResponse = response.hits.hits.map((data) => data._source);
      return res.json(searchResponse);
    }

    return res.json('Not Found').status(401);
  });
  // const result = await db.query('SELECT * FROM card WHERE LOWER(data->>\'name\') LIKE LOWER(($1))', [`%${req.query.q}%`]);
  //
  // if (result != null) {
  //   return res.json(result.rows);
  // }
});

module.exports = router;
