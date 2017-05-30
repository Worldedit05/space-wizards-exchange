const router = require('express').Router();
const axios = require('axios');

const pool = require('../db.js');

router.get('/', (req, res) => {
  axios.get('https://swdestinydb.com/api/public/cards/')
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get('/sync', (req, res) => {
  axios.get('https://swdestinydb.com/api/public/cards/')
    .then((response) => {
      /* eslint consistent-return: 0 */
      pool.connect((err, client, done) => {
        if (err) {
          return console.error('error fetching client from pool', err);
        }

        response.data.forEach((swdDbCard) => {
          client.query('INSERT INTO card (data) VALUES ($1)', [swdDbCard], (errQuery, result) => {
            done(errQuery);

            if (errQuery) {
              return console.error('error running client query', errQuery);
            }

            return console.log(result);
          });
        });
      });
    })
    .catch((error) => {
      console.log(error);
    });

  return res.json('Sync Complete!');
});

module.exports = router;
