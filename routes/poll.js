const express = require('express');
const Polls = require('../models/poll');
// const Circles = require('../models/circle');
const Users = require('../models/user');

function getEditor() {
  return (req, res, next) => {
    const id = req.headers.authid;
    if (id) {
      console.log(req.headers);
      Users.findById(id, (err, user) => {
        req.editor = user;
      });
    }
    next();
  };
}

const router = express.Router();

// Verifies if user is an fellow
function isFellow() {
  return (req, res, next) => {
    if (req.editor && req.editor.circles.some(circle => `${circle}` === `${req.poll.circle}`)) {
      return next();
    }
    return res.status(401).json({ err: 'You do not have access to this poll' });
  };
}

// Verifies if user is an admin
function isAdmin() {
  return (req, res, next) => {
    if (req.editor && req.editor.admin_circles.some(circle => `${circle}` === `${req.poll.circle}`)) {
      return next();
    }
    return res.status(401).json({ err: 'You can not modify polls' });
  };
}

router.use('*', getEditor());
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
  Users.findById(id, (err, circle) => {
    if (err) return res.status(404).json({ err: 'Circle not found' });
    req.circle = circle;
    return next();
  });
});


router.route('/')
  .post((req, res) => {
    // Create a new poll if editor is an admin
    if (req.editor.admin_circles.some(req.body.circle)) {
      res.status(401).json({ err: 'You cannot create a poll. You are not an admin' });
      return;
    }
    Polls.create(req.body, (err, poll) => {
      if (err) {
        console.log(err);
        return res.status(404).json({ err: 'Could not create poll' });
      }
      return res.json({ poll });
    });
  });

router.route('/all')
  // Get all poll TEMPORARY *******************
  .get((req, res) => {
    Polls.find((err, polls) => {
      if (err) {
        console.log(err);
        res.status(500).json({ err: 'Could not load polls' });
      }
      return res.json(polls);
    });
  });

router.route('/:poll')
  // Get a poll, restrict to fellows
  .get(isFellow(), (req, res) => {
    res.json(req.poll);
  })
  // Edit a poll, restrict to admins
  .post(isAdmin(), (req, res) => {
    const newPoll = Object.assign({}, req.poll, req.body);
    Polls.findByIdAndUpdate(req.poll._id, { $set: newPoll }, (err, poll) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.json(poll);
    });
  })
  // Delete a poll, restrict to admins
  .delete(isAdmin(), (req, res) => {
    Polls.findByIdAndRemove(req.poll._id, (err, poll) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.json(poll);
    });
  });

router.route('/:poll/vote/:option')
  // Vote in a poll, restrict to admin
  .post(isFellow(), (req, res) => {
    req.poll.vote(req.params.option);
    res.json(req.poll);
  });

router.route('/circle/:circle')
  // Get polls for a circle. TEMPORARY ************
  .get((req, res) => {
    Polls.find().forCircle(req.params.circle).exec((err, polls) => {
      res.json(polls);
    });
  });

module.exports = router;
