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
  const response = await axios.get('https://swdestinydb.com/api/public/cards/');
  let cardsToProcess = [];
  let numberOfChangedCards = 0;
  let newResponse = '';
  let cardsChanged;
  /* eslint consistent-return: 0 */

  const result = await pool.query('SELECT data AS dbCard, swd_database_code AS cardCode FROM card', []);
  if (result.rowCount === 0) {
    cardsToProcess = response.data;
    cardsChanged = false;
  }

  if (result.rowCount > 0) {
    await result.rows.forEach((row) => {
      const apiCardObj = response.data.find((value) => {
        if (value.code === row.cardcode) {
          console.log(`Card match found ${value.code}, ${row.cardcode}`);
        }
        return value.code === row.cardcode;
      });

      if (!deepEqual(apiCardObj, row.dbcard)) {
        cardsToProcess.push(apiCardObj);
        numberOfChangedCards += 1;
        cardsChanged = true;
      }
    });
    console.log(`SWDestinyDB reponse has changed ${numberOfChangedCards} cards`);
  }

  await cardsToProcess.forEach(async (swdDbCard) => {
    console.log(swdDbCard.code);
    const insertResults = await pool.query('INSERT INTO card (data, swd_database_code) VALUES ($1 , $2) ON CONFLICT (swd_database_code) DO UPDATE SET (data) = ($1);', [swdDbCard, swdDbCard.code]);
    console.log(insertResults);
  });

  newResponse = cardsChanged ? res.json([{ numberOfChangedCards }, cardsToProcess]) : res.json('No_cards_were_changed');

  return newResponse;
});

module.exports = router;
