const express = require('express');
const poll = require('../controllers/polls');
const { auth, extractUser, canVotePoll, allowCircleFellow, canAccessPoll } = require('./middlewares');

const router = express.Router();

// ensure anyone accessing these routes is authenticated
// router.use(auth.required());

router
  .route('/')
  .all(auth.required)
  .get(poll.all) // NOT CORRECT O !!!!!!!!
  .post(poll.create);

router.get('/all', poll._all)

router.get('/search', poll.search)

router.get('/circle/:circle', allowCircleFellow, poll.circle);

router
  .route('/:poll')
  .get(poll.get)
  .delete(canAccessPoll, poll.delete);


router.post('/:poll/appropriate', canVotePoll, poll.appropriate);

router.post('/:poll/inappropriate', canVotePoll, poll.inappropriate);

router.post('/:poll/vote', canVotePoll, poll.vote);

module.exports = router;
