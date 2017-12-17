const Users = require('../models/user')

module.exports = {
  get(req, res) {
    Users.findById(req.payload.id)
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        res.status(403),json({ err: 'Could not get yourself' })
      })
  },
  getUser(req, res) {
    Users.findById(req.params.user, { 
      username: 1,
      first_name: 1,
      last_name: 1,
      email_address: 1,
    })
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        res.status(403).json({ err: 'Could not get the requested user' })        
      })
  },
  all(req, res) {
    Users.find()
      .then(users => {
        res.json(users)
      })
      .catch(err=> {
        res.status(403).json({ err: 'Could not get all users' })
      })
  },
  delete(req, res) {
    Users.findByIdAndRemove(req.payload.id)
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        res.status(403).json({ err: 'Could not delete your account' })
      })
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
    console.log(req.body)
    Users.findByIdAndUpdate(req.payload.id, req.body)
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        res.json({ err: 'Could not update your account' })
      })
  },
  starPoll(req, res) {
    Users.findByIdAndUpdate(req.payload.id, { $addToSet: { starred_polls: req.body.poll }})
      .then(user=> {
        res.json(user)
      })
      .catch(err=> {
        res.status(403).json({ err: "Could not star poll" })
      })
  },
  unstarPoll(req, res) {
    Users.findByIdAndUpdate(req.payload.id, { $pop: { starred_polls: req.body.poll }})
      .then(user=> {
        res.json(user)
      })
      .catch(err=> {
        res.status(403).json({ err: "Could not unstar poll" })
      })
  },
  follow(req, res) {
    Users.findByIdAndUpdate(req.payload.id, { $addToSet: { following: req.params.user } })
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        res.status(403).json({ err: "Could not follow user" })
      })
  },
  unfollow(req, res) {
    Users.findByIdAndUpdate(req.payload.id, { $pop: { following: req.params.user } })
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        res.status(403).json({ err: "Could not unfollow user" })
      })
  },
}