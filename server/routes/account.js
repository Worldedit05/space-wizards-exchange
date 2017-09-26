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
    const randomDisplayName = `${req.body.firstName}${req.body.lastName}${randomID}`;

    await db.query('INSERT INTO account (email, first_name, last_name, display_name) VALUES ($1, $2, $3, $4)', [req.body.email, req.body.firstName, req.body.lastName, randomDisplayName.toLowerCase()]);
    response = res.json({ success: true, message: `Please check ${req.body.email} for a verification email!` });
  }

  return response;
});

router.get('/check/:id', async (req, res) => {
  const displayName = await db.query('SELECT * FROM account WHERE display_name = ($1)', [req.params.id]);

  if (displayName.rowCount > 0) {
    return res.json({ isDisplayNameTaken: true, message: 'Display name is taken' });
  }

  return res.json({ isDisplayNameTaken: false, message: 'Display name is available' });
});

router.get('/:id', async (req, res) => {
  const profileInfo = await db.query('SELECT * FROM account WHERE display_name = ($1)', [req.params.id]);
  if (profileInfo.rowCount === 0) {
    return res.status(404).send('Not Found');
  }
  const accountId = profileInfo.rows[0].id;
  const accountCardData = await db.query('SELECT * FROM user_card_list WHERE account_id = ($1)', [accountId]);

  return res.json({ account: profileInfo.rows[0], cardData: accountCardData.rows });
});

module.exports = router;
