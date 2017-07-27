const Router = require('express-promise-router');

const pool = require('../db.js');

const router = new Router();

router.get('/', async (req, res) => {
  if (!req.query.q) {
    return res.status(400).send('Please provide a query parameter');
  }
  const result = await pool.query('SELECT * FROM card WHERE data->>\'name\' LIKE ($1)', [`${req.query.q}%`]);

  if (result != null) {
    return res.json(result.rows);
  }

  return res.json('Not Found').status(401);
});

module.exports = router;
