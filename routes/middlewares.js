const Users = require('../models/user');
// const Circles = require('../models/circle');
// const Polls = require('../models/poll');

function getPayload() {
  return (req, res, next) => {
    const id = req.headers.authid;
    if (id) {
      Users.findById(id, (err, user) => {
        req.payload = user;
        next();
      });
    } else {
      next();
    }
  };
}

const auth = {
  optional() {
    return (req, res, next) => next();
  },
  required() {
    return (req, res, next) => {
      if (req.payload) {
        return next();
      }
      return res.status(401).json({ err: 'You are not logged in' });
    };
  },
};

function adminPoll() {
  return (req, res, next) => {
    const created = req.payload.createdPolls.some(req.poll._id);
    const isAdmin = req.payload.isAdmin(req.poll.circle);
    if (created || isAdmin) {
      return next();
    }
    return res.status(401).json({ err: 'You cannot access this route' });
  };
}

function fellowPoll() {
  return (req, res, next) => {
    if (req.payload.isFellow(req.poll.circle)) {
      return next();
    }
    return res.status(401).json({ err: 'You cannot access this route' });
  };
}

function adminCircle(req, res, next) {
  console.log('Circle ', req.params.circle);
  if (req.payload.isAdmin(req.params.circle)) {
    return next();
  }
  return res.status(401).json({ err: 'You cannot access this route' });
}

function fellowCircle(req, res, next) {
  console.log('Circle ', req.payload._id, req.params.circle);
  if (req.payload.isFellow(req.params.circle)) {
    return next();
  }
  return res.status(401).json({ err: 'You cannot access this route' });
}

function hasNotVoted(id) {
  return (req, res, next) => {
    if (!req.payload.hasVoted(id)) {
      return next();
    }
    return res.status(401).json({ err: 'You cannot access this route' });
  };
}

module.exports = {
  getPayload,
  adminPoll,
  fellowPoll,
  adminCircle,
  fellowCircle,
  hasNotVoted,
  auth,
};
