const Router = require('express-promise-router');

const db = require('../db.js');

const router = new Router();

router.post('/setup', async (req, res) => {
  let response;
  let isNewAccount = true;
  const account = await db.query('SELECT * FROM account WHERE email = ($1)', [req.body.email]);
  console.log(account.rowCount);
  const accountRowCount = account.rowCount;

  if (accountRowCount === 1) {
    console.log('Account query returned a single row where that email already exists');
    isNewAccount = false;
    response = res.json({ success: false, message: 'User with that email already exists. Please double check your email and submit again!' });
  } else if (accountRowCount > 1) {
    console.log('Account query returned mutiple results');
    isNewAccount = false;
    response = res.json({ success: false, message: 'The email you entered already exists. Please provide a unique email.' });
  }

  if (isNewAccount) {
    const newAccount = await db.query('INSERT INTO account (email, first_name, last_name, username) VALUES ($1, $2, $3, $4)', [req.body.email, req.body.firstName, req.body.lastName, req.body.userName]);
    response = res.json({ success: true, message: 'User successfully created!' });
  }

  return response;
});

router.get('/check/:id', async (req, res) => {
  const userName = await db.query('SELECT * FROM account WHERE username = ($1)', [req.params.id]);

  if (userName.rowCount > 0) {
    return res.json({ isUserNameTaken: true, message: 'Username is taken' });
  }

  return res.json({ isUserNameTaken: false, message: 'Username is available' });
});

module.exports = router;
