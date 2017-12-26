const express = require('express');
const poll = require('../controllers/polls');
const { auth, extractUser } = require('./middlewares');

const router = express.Router();

// ensure anyone accessing these routes is authenticated
// router.use(auth.required());

router
  .route('/')
  .all(extractUser, auth.required)
  .get(poll._all) // NOT CORRECT O !!!!!!!!
  .post(poll.create);

router.get('/all', poll._all)

router.get('/search', poll.search)

router.get('/circle/:circle', poll.circle);

router
  .route('/:poll')
  .get(poll.get)
  .delete(poll.delete);


router.post('/:poll/appropriate', poll.appropriate);

router.post('/:poll/inappropriate', poll.inappropriate);

router.post('/:poll/vote', poll.vote);

module.exports = router;
