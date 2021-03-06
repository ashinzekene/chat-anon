const express = require('express');
const User = require('../models/user');
const Polls = require('../models/poll');
const { fellowPoll, auth } = require('./middlewares');

const route = express.Router();

function handleError(res, err = 'An error occurred') {
  return (error) => {
    console.log(error);
    return res.status(403).json({ err });
  };
}

route.route('/')
  .get(auth.required(), (req, res) => res.json(req.payload))
  .put((req, res) => {
    User.findByIdAndUpdate(req.params.user, { $set: req.body }, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json('Could not update user');
      }
      if (!user) {
        console.log(err);
        return res.status(404).json('User not found');
      }
      return res.json(user);
    });
  })
  .post((req, res) => {
    User.create(req.body)
      .then(user => res.json(user))
      .catch(handleError(res));
  });

route.route('/all')
  .get((req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(handleError(res));
  })
  delete((req, res) => {
    Users.remove({})
    .then(res =>{
      res.json({ res: "Everything deleted" })
    })
    .catch(err => {
      res.json(err)
    })
  })

route.post('/star/:poll', fellowPoll(), (req, res) => {
  if (req.payload.hasStarred) {
    Polls.findByIdAndUpdate(req.params.poll, { $inc: { stars: 1 } })
      .then(poll => res.json(poll))
      .catch(handleError(res));
  } else {
    Polls.findByIdAndUpdate(req.params.poll, { $inc: { stars: -1 } })
      .then(poll => res.json(poll))
      .catch(handleError(res));
  }
});

route.route('/:user')
  .get((req, res) => {
    User.findById(req.params.user)
      .then(user => res.json(user))
      .catch(handleError(res));
  })
  .post((req, res) => {
    User.findByIdAndUpdate(req.payload._id, { $set: req.body }, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json('Could not update user');
      }
      if (!user) {
        console.log(err);
        return res.status(401).json('User not found');
      }
      return res.json(user);
    });
  })
  .delete((req, res) => {
    User.findByIdAndRemove(req.params.user)
      .then(user => res.json(user))
      .catch(handleError(res));
  });

route.post('/follow/:user', (req, res) => {
  User.findByIdAndUpdate(req.payload._id, { $addToSet: { following: req.user } })
    .then(user => {
      res.json(user)
    })
    .catch(handleError(res, "Could not follow user"))
})

route.post('/unfollow/:user', (req, res) => {
  User.findByIdAndUpdate(req.payload._id, { $popAll: { following: req.user } })
    .then(user => {
      res.json(user)
    })
    .catch(handleError(res, "Could not follow user"))
})

module.exports = route;
