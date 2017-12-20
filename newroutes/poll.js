const express = require('express');
const poll = require('../controllers/polls');
const {
  adminPoll, fellowPoll, hasNotVoted, auth,
} = require('./middlewares');

const router = express.Router();

// ensure anyone accessing these routes is authenticated
// router.use(auth.required());

router
  .route('/')
  .get(poll._all)
  .post(poll.create);

router.get('/all', poll._all)

router.get('/search', poll.search)

router
  .route('/:poll')
  .get(poll.get)
  .delete(poll.delete);

router.post('/:poll/appropriate', poll.appropriate);

router.post('/:poll/inappropriate', poll.inappropriate);

router.post('/:poll/vote', poll.vote);

module.exports = router;
