const Router = require('express-promise-router');

const db = require('../db.js');
const randomInt = require('../helpers/random_int');

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
    response = res.json({ success: true, message: `Please check ${req.body.email} for a verification email!` });
  } else if (accountRowCount > 1) {
    console.log('Account query returned mutiple results');
    isNewAccount = false;
    response = res.json({ success: false, message: 'An error has occurred. Please contact the support email.' });
  }

  if (isNewAccount) {
    const randomID = randomInt(10000, 99999);
    const randomUserName = `${req.body.firstName}${req.body.lastName}${randomID}`;

    await db.query('INSERT INTO account (email, first_name, last_name, username) VALUES ($1, $2, $3, $4)', [req.body.email, req.body.firstName, req.body.lastName, randomUserName.toLowerCase()]);
    response = res.json({ success: true, message: `Please check ${req.body.email} for a verification email!` });
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
