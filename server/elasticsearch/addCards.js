const esClient = require('../elasticsearch/connection.js');

const db = require('../db.js');

const addCards = async () => {
  const result = await db.query('SELECT * FROM card');

  Object.values(result.rows).forEach((card) => {
    esClient.index({
      index: 'card',
      id: `${card.data.code}`,
      type: 'cardData',
      body: card.data,
    }, (err, resp, status) => {
      console.log('Response', resp);
      console.log('Status', status);
    });
  });
};

addCards();

module.exports = addCards;
