const Router = require('express-promise-router');

const pool = require('../db.js');

const router = new Router();

router.post('/setup', (req, res) => {
  console.log(req.body);
  res.json({ success: true });
});

module.exports = router;
