const axios = require('axios');
const deepEqual = require('deep-equal');
const Router = require('express-promise-router');

const db = require('../db.js');

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
  const insertedCardsList = [];
  const insertNewCardResults = '';
  const insertChangedCardResults = '';
  let numberOfChangedCards = 0;
  let numberofNewCards = 0;
  let newResponse = '';
  let cardsInserted;

  /* eslint-disable */
  for (const card of response.data) {
    const dbCard = await db.query('SELECT data AS dbCard FROM card WHERE swd_database_code = ($1)', [card.code]);

    if (dbCard.rowCount === 0) {
      try {
        insertNewCardResults = await db.query('INSERT INTO card (data, swd_database_code) VALUES ($1 , $2) ON CONFLICT (swd_database_code) DO UPDATE SET (data) = ($1);', [card, card.code]);
      }
      catch (err) {
        console.log(err);
      }
      finally {
        console.log(insertNewCardResults);
        insertedCardsList.push(card);
        numberofNewCards += 1;
        cardsInserted = true;
      }

    } else if (dbCard.rowCount === 1) {

      if (!deepEqual(card, dbCard.rows[0].dbcard)) {
        try {
          insertChangedCardResults = await db.query('INSERT INTO card (data, swd_database_code) VALUES ($1 , $2) ON CONFLICT (swd_database_code) DO UPDATE SET (data) = ($1);', [card, card.code]);
        }
        catch (err) {
          console.log(err);
        }
        finally {
          console.log(insertChangedCardResults);
          insertedCardsList.push(card);
          numberOfChangedCards += 1;
          cardsInserted = true;
        }
      }
    }
  }
  /* eslint-enable */

  console.log(`SWDestinyDB reponse has changed ${numberOfChangedCards} cards`);

  newResponse = cardsInserted ? res.json([{ numberofNewCards }, { numberOfChangedCards }, insertedCardsList]) : res.json('No_cards_were_changed');
  return newResponse;
});

module.exports = router;
