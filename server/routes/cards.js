const router = require('express').Router();
const axios = require('axios');
const deepEqual = require('deep-equal');

const pool = require('../db.js');

function getModifiedCards(responseData) {
  let changedCards = [];
  let numberOfChangedCards = 0;
  pool.query('SELECT data AS dbCard FROM card', [], (err, results) => {
    if (err) {
      return console.error('error running get modified cards query');
    }

    if (results.rowCount === 0) {
      changedCards = responseData;
      return changedCards;
    }

    results.rows.forEach((row) => {
      const apiCardObj = responseData.find((value) => {
        return value.code === row.dbcard.code;
      });

      if (!deepEqual(apiCardObj, row.dbcard)) {
        changedCards.push(apiCardObj);
        numberOfChangedCards += 1;
        console.log('SWDestinyDB reponse has changed', numberOfChangedCards);
      }
    });
  });
  console.log(changedCards);
  return changedCards;
}

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
    .then(async (response) => {
      let changedCards = [];
      let numberOfChangedCards = 0;
      /* eslint consistent-return: 0 */
      pool.connect((err, client, done) => {
        if (err) {
          return console.error('error fetching client from pool', err);
        }

        client.query('SELECT data AS dbCard FROM card', [], (err, results) => {
          if (err) {
            return console.error('error running get modified cards query');
          }
          //console.log(response.data);
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
        });
        console.log(changedCards);
        changedCards.forEach((swdDbCard) => {
          client.query('INSERT INTO card (data) VALUES ($1)', [swdDbCard], (errQuery, result) => {

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
