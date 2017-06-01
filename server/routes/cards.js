const axios = require('axios');
const deepEqual = require('deep-equal');
const Router = require('express-promise-router');

const pool = require('../db.js');

const router = new Router();

router.get('/', (req, res) => {
  axios.get('https://swdestinydb.com/api/public/cards/')
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get('/sync', async (req, res) => {
  const response = await axios.get('https://swdestinydb.com/api/public/cards/').catch((ex) => {
    console.error(ex);
  });
  let changedCards = [];
  let numberOfChangedCards = 0;

  /* eslint consistent-return: 0 */
  const rows = await pool.connect((err, client, done) => {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    client.query('SELECT data AS dbCard FROM card', [], async (errSELECT, results) => {
      done(errSELECT);
      if (errSELECT) {
        return console.error('error running get modified cards query');
      }

      if (results.rowCount === 0) {
        changedCards = response.data;
      }

      results.rows.forEach((row) => {
        const apiCardObj = response.data.find((value) => {
          return value.code === row.dbcard.code;
        });

        if (!deepEqual(apiCardObj, row.dbcard)) {
          changedCards.push(apiCardObj);
          numberOfChangedCards += 1;
          console.log('SWDestinyDB reponse has changed', numberOfChangedCards);
        }
      });

      await changedCards.forEach((swdDbCard) => {
        client.query('INSERT INTO card (data) VALUES ($1)', [swdDbCard], (errQuery, result) => {
          done(errQuery);

          if (errQuery) {
            return console.error('error running client query', errQuery);
          }
          return console.log(result);
        });
      });
      return res.send(rows);
    });
  });
});

module.exports = router;
