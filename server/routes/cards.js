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
      console.error(error);
    });
});

router.get('/:id', async (req, res) => {
  const card = await db.query('SELECT * FROM card WHERE id = ($1)', [req.params.id]);
  console.log(card.rows[0]);
  return res.json(card.rows[0]);
});

router.get('/sync', async (req, res) => {
  const response = await axios.get('https://swdestinydb.com/api/public/cards/');
  const insertedCardsList = [];
  let insertNewCardResults;
  let insertChangedCardResults;
  let numberOfChangedCards = 0;
  let numberofNewCards = 0;
  let cardsInserted;

  const saveCard = async (card) => {
    insertNewCardResults = await db.query('INSERT INTO card (data, swd_code) VALUES ($1 , $2) ON CONFLICT (swd_code) DO UPDATE SET (data) = ($1);', [card, card.code]);
  };

  /* eslint-disable */
  for (const card of response.data) {
    const dbCard = await db.query('SELECT data AS dbCard FROM card WHERE swd_code = ($1)', [card.code]);

    if (dbCard.rowCount === 0) {
      try {
        saveCard(card);
      }
      catch (err) {
        console.error(err);
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
          saveCard(card);
        }
        catch (err) {
          console.error(err);
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

  const newResponse = cardsInserted ? res.json({ numberofNewCards, numberOfChangedCards, insertedCardsList }) : res.json('No_cards_were_changed');
  return newResponse;
});

module.exports = router;
