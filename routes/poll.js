const express = require('express');
const Polls = require('../models/poll');
const Circles = require('../models/circle');
const Users = require('../models/user');
const { allowFellowPoll, allowAdminPoll } = require('../utils');

const router = express.Router();

router.param('poll', (req, res, next, id) => {
  // ALL POLLS WOULD BE REMOVED LATER
  Polls.findById(id, (err, poll) => {
    req.poll = poll;
  });
});

router.param('user', (req, res, next, id) => {
  // ALL POLLS WOULD BE REMOVED LATER
  Users.findById(id, (err, poll) => {
    req.poll = poll;
  });
});

router.route('/')
  .get((req, res) => {
    Polls.find((err, polls) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.json(polls);
    });
  })
  .post((req, res) => {
    const { body } = req;
    Circles.findByIdAndUpdate(body.circle, { $push: { } }, (err) => {
      if (err) {
        console.log(err);
        res.status(400).json({ err: 'Could not create poll' });
        return;
      }
      Polls.create(body, (pollErr, poll) => {
        if (pollErr) {
          console.log(pollErr);
          return res.status(500).json({ err: 'Could not create poll' });
        }
        return res.json(poll);
      });
    });
  });

router.route('/:user/:group')
  .get((req, res) => {
    Polls.find({ $elemMatch: { $eq: req.params.group } }, (err, polls) => {
      res.json(polls);
    });
  });

router.route('/:poll/:user')
  .get((req, res) => {
    res.json(req.poll);
  })
  .post((req, res) => {
    const newPoll = Object.assign({}, req.poll, req.body);
    Polls.findByIdAndUpdate(req.poll._id, { $set: { newPoll } }, (err, poll) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.json(poll);
    });
  })
  .delete((req, res) => {
    Polls.findByIdAndRemove(req.poll._id, (err, poll) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.json(poll);
    });
  });

module.exports = router;
