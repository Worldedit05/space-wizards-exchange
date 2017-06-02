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
  let changedCardsResults = '';
  let cardsChanged;
  /* eslint consistent-return: 0 */

  const result = await pool.query('SELECT data AS dbCard FROM card', []);
  if (result.rowCount === 0) {
    cardsToProcess = response.data;
    cardsChanged = false;
  }

  if (result.rowCount > 0) {
    await result.rows.forEach((row) => {
      const apiCardObj = response.data.find((value) => {
        return value.code === row.dbcard.code;
      });

      if (!deepEqual(apiCardObj, row.dbcard)) {
        cardsToProcess.push(apiCardObj);
        numberOfChangedCards += 1;
        cardsChanged = true;
        console.log('SWDestinyDB reponse has changed', numberOfChangedCards);
      }
    });
  }

  await cardsToProcess.forEach((swdDbCard) => {
    const insertResults = pool.query('INSERT INTO card (data) VALUES ($1)', [swdDbCard]);
    changedCardsResults += insertResults;
  });
  newResponse = cardsChanged ? res.json(changedCardsResults + numberOfChangedCards) : res.json('No_cards_were_changed');
  return newResponse;
});

module.exports = router;
