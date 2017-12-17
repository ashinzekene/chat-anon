const express = require('express');
const poll = require('../controllers/polls');
const {
  adminPoll, fellowPoll, hasNotVoted, auth,
} = require('./middlewares');

const router = express.Router();

// ensure anyone accessing these routes is authenticated
router.use(auth.required());

router
  .route('/')
  .get(poll._all)
  .post(poll.create);

router
  .route('/all')
  // Get all poll TEMPORARY *******************
  .get(poll._all)
  // .delete();

router
  .route('/:poll')
  .get(poll.get)
  .post(poll.edit)
  .delete(poll.delete);

router.post('/:poll/appropriate', fellowPoll(), (req, res) => {
  Polls.findByIdAndUpdate(req.params.poll, { $addToSet: { appropriate: req.payload._id } })
    .then(poll => res.json(poll))
    .catch(handleError(res));
});

router.post('/:poll/inappropriate', fellowPoll(), (req, res) => {
  Polls.findByIdAndUpdate(req.params.poll, { $addToSet: { in_appropriate: req.payload._id } })
    .then(poll => res.json(poll))
    .catch(handleError(res));
});

router
  .route('/:poll/vote/:option')
  // VOTE IN A POLL
  .post(poll.vote);

module.exports = router;
