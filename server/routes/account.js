const Router = require('express-promise-router');

const db = require('../db.js');

const router = new Router();

router.post('/setup', async (req, res) => {
  let response;
  const account = await db.query('SELECT * FROM account WHERE email = ($1)', [req.body.email]);
  console.log(account.rowCount);
  const accountRowCount = account.rowCount;

  if (accountRowCount === 1) {
    console.log('Account query returned a single row where that email already exists');
    response = res.json({ success: false, message: 'User with that email already exists. Please double check your email and submit again!' });
  } else if (accountRowCount > 1) {
    console.log('Account query returned mutiple results');
    response = res.json({ success: false, message: 'The email you entered already exists. Please provide a unique email.' });
  }

  if (accountRowCount === 0) {
    const newAccount = await db.query('INSERT INTO account (email, first_name, last_name, username) VALUES ($1, $2, $3, $4)', [req.body.email, req.body.firstName, req.body.lastName, req.body.userName]);
    response = res.json({ success: true, message: 'User successfully created!' });
  }

  return response;
});

module.exports = router;
