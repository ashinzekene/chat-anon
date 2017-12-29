const Users = require('../models/user');
const Circles = require('../models/circle');
const Polls = require('../models/poll');

function extractUser(req, res, next) {
  const id = req.headers.authid;
  Users.findById(id)
    .then(user => {
      if (user && user._id) {
        req.user = user
      } else {
        console.log("Could not get the currently logged in user")
      }
      next()
    })
    .catch(err => {
      console.log(err)
      console.log("An error occurred, Could not get the currently logged in user")
      next()
    })
}

const auth = {
  optional() {
    return (req, res, next) => next();
  },
  required(req, res, next) {
    if (req.user) {
      return next();
    }
    return res.status(401).json({ err: 'You are not logged in' });
  },
};

function allowCircleAdmin(req, res, next) {
  Circles.findOne({ _id: req.params.circle, admins: { $in : [ req.user._id ]} })
    .then(circle => {
      if (circle && circle._id) {
        next()
      } else {
        return res.status(401).json({ err: 'You are not authorized. Only accessible to circle Admins' });
      }
    })
    .catch(err => {
      console.log(err)
      return res.status(401).json({ err: 'An error occurred, You are not authorized. Only accessible to circle Admins' });
    })
}

function allowCircleFellow(req, res, next) {
  console.log(req.params.circle, req.user)
  Circles.findOne({ _id: req.params.circle, fellows: { $in : [ req.user._id ]} })
    .then(circle => {
      console.log("CIRCLE -------", circle)
      if (circle && circle._id) {
        next()
      } else {
        return res.status(401).json({ err: 'You are not authorized. Only accessible to circle Fellows' });
      }
    })
    .catch(err => {
      console.log(err)
      return res.status(401).json({ err: 'An error occurred, You are not authorized. Only accessible to circle Fellows' });
    })
}

function canAccessPoll(req, res, next) {
  Polls.findById(req.params.poll)
    .then(poll => {
      req.poll = poll
      Circles.findOne({ _id: poll.circle, fellows: { $in: [req.user._id] } })
        .then(circle => {
          if (circle && circle._id) {
            req.circle = circle
            return next()
          }
          return res.status(401).json({ err: 'You are not authorized to view this poll' });
        })
      })
      .catch(err => {
        console.log(err)
        return res.status(401).json({ err: 'An error occurred, You are not authorized to view this poll' });  
    })
}

function canVotePoll(req, res, next) {
  if (req.user.hasVoted(req.params.poll)) return res.status(401).json("You have already voted")
  Polls.findById(req.params.poll)
    .then(poll => {
      req.poll = poll
      Circles.findOne({ _id: poll.circle, fellows: { $in: [req.user._id] } })
        .then(circle => {
          if (circle && circle._id) {
            req.circle = circle
            return next()
          }
          return res.status(401).json({ err: 'You are not authorized to vote this poll' });
        })
      })
      .catch(err => {
        console.log(err)
        return res.status(401).json({ err: 'An error occurred, You are not authorized to vote this poll' });  
    })
}

module.exports = {
  extractUser,
  auth,
  allowCircleAdmin,
  allowCircleFellow,
  canVotePoll,
  canAccessPoll
};
