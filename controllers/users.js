const Users = require('../models/user')

module.exports = {
  get(req, res) {
    if (req.user.id === req.params.id) {
      // Show full user
    } else {
      // Shoe liitle details about user
    }
  },
  create(req, res) {
    Users.create(req.body)
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        res.status(403).json({ err: 'Could not create account' })
      })
  },
  update(req, res) {
    if (req.user.id === req.params.id) {
      Users.findByIdAndUpdate(req.params.id, req.body)
        .then(user => {
          res.json(user)
        })
        .catch(err => {
          res.json({ err: 'Could not update your account' })
        })
      } else {
        res.status(401).json({ err: 'You are not authorized to update this user' })
    }
  },
  favouritePoll(req, res) {
    Users.findByIdAndUpdate(req.user.id, { $addToSet: { favoutite_polls: req.body.poll }})
      .then(user=> {
        res.json(user)
      })
      .catch(err=> {
        res.status(403).json({ err: "Could not favourite poll" })
      })
  },
  unfavouritePoll(req, res) {
    Users.findByIdAndUpdate(req.user.id, { $pop: { favoutite_polls: req.body.poll }})
      .then(user=> {
        res.json(user)
      })
      .catch(err=> {
        res.status(403).json({ err: "Could not favourite poll" })
      })
  },
  delete(req, res) {
    if (req.user.id === req.params.id) {
      Users.findByIdAndRemove(req.params.id, req.body)
        .then(user => {
          res.json(user)
        })
        .catch(err => {
          res.json({ err: 'Could not delete your account' })
        })
      } else {
        res.status(401).json({ err: 'You are not authorized to delete this user' })
    }
  }
}