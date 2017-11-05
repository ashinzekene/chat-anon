const express = require('express');
const Polls = require('../models/poll');
const Circles = require('../models/circle');
const Users = require('../models/user');
const {
  adminPoll, fellowPoll, hasNotVoted, auth,
} = require('./middlewares');

const router = express.Router();

function handleError(res, err = 'An error occurred') {
  return (error) => {
    console.log(error);
    return res.status(403).json({ err });
  };
}

// ensure anyone accessing these routes is authenticated
router.use(auth.required());

// Get the poll in params
router.param('poll', (req, res, next, id) => {
  Polls.findById(id, (err, poll) => {
    if (err) return res.status(404).json({ err: 'Poll not found' });
    req.poll = poll;
    return next();
  });
});

// Get the user in params
router.param('user', (req, res, next, id) => {
  Users.findById(id, (err, user) => {
    if (err) return res.status(404).json({ err: 'User not found' });
    req.user = user;
    return next();
  });
});

// Get the circle in params
router.param('circle', (req, res, next, id) => {
  Circles.findById(id, (err, circle) => {
    if (err) return res.status(404).json({ err: 'Circle not found' });
    req.circle = circle;
    return next();
  });
});

router
  .route('/')
  .get((req, res) => {
    // GETTING A FELLOWS POLLS
    Polls.find()
      .where('circle')
      .in(req.payload.circles)
      .populate("circle", "name")
      .populate("creator", "username")
      .exec()
      .then(polls => res.json(polls))
      .catch(handleError(res));
  })
  .post((req, res) => {
    // CREATING A NEW POLL
    req.body.creator = req.payload._id;
    Polls.create(req.body)
      .then(poll => req.payload.createPoll(poll._id))
      .then(poll => res.json(poll))
      .catch(handleError(res));
  });

router
  .route('/all')
  // Get all poll TEMPORARY *******************
  .get((req, res) => {
    Polls.find({})
      .populate("circle", "name")
      .populate("creator", "username")
      .then(polls => res.json(polls))
      .catch(handleError(res, 'Could not fetch all polls'));
  });

router
  .route('/:poll')
  // GETTING A POLL
  .get(fellowPoll(), (req, res) => res.json(req.poll))
  .post(adminPoll(), (req, res) => {
    // EDITING A POLL
    const newPoll = Object.assign({}, req.poll, req.body);
    Polls.findByIdAndUpdate(req.poll._id, { $set: newPoll }, (err, poll) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.json(poll);
    });
  })
  .delete((req, res) => {
    // DELETING A POLL
    Polls.findByIdAndRemove(req.poll._id, (err, poll) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.json(poll);
    });
  });

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
  .post(fellowPoll(), hasNotVoted(), (req, res) => {
    req.poll.vote(req.params.option);
    res.json(req.poll);
  });

module.exports = router;
