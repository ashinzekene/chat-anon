const Users = require('../models/user')

module.exports = {
  get(req, res) {
    Users.findById(req.payload.id, { password: 0 })
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: 'Could not get yourself' })
      })
  },
  login(req, res) {
    let {username, password } = req.body
    Users.findOne({ username, password }, { password: 0 })
      .then(user => {
        if (!user) {
          return res.status(403).json({ err: 'Username and password not found' })
        }
        res.json(user)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: 'Could not log you in' })
      })
  },
  search(req, res) {
    Users.find({ username: RegExp(req.query.q) }, "username first_name")
    .limit(5)
    .then(users => {
        res.json(users)
      })
      .catch(err => {
        console.log(err)
        res.atatus(403).json({ err: "could not search for users" })
      })
  },
  verifyEmail(req, res) {
    Users.find({ email_address : req.body.email }, {
      _id: 0,
      email_address: 1,
    })
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: 'Could not get the requested user' })
      })
  },
  verifyUsername(req, res) {
    Users.find({ username : req.body.username }, {
      _id: 0,
      username: 1,
    })
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: 'Could not get the requested user' })
      })
  },
  getUser(req, res) {
    Users.find({ username : req.params.user }, "username first_name last_name following")
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: 'Could not get the requested user' })
      })
  },
  all(req, res) {
    Users.find({}, { password: 0 })
      .then(users => {
        res.json(users)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: 'Could not get all users' })
      })
  },
  delete(req, res) {
    Users.findByIdAndRemove(req.payload.id)
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: 'Could not delete your account' })
      })
  },
  create(req, res) {
    Users.create(req.body, { password: 0 })
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        console.log(err)
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
        console.log(err)
        res.json({ err: 'Could not update your account' })
      })
  },
  starPoll(req, res) {
    Users.findByIdAndUpdate(req.payload.id, { $addToSet: { starred_polls: req.body.poll } })
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: "Could not star poll" })
      })
  },
  unstarPoll(req, res) {
    Users.findByIdAndUpdate(req.payload.id, { $pop: { starred_polls: req.body.poll } })
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: "Could not unstar poll" })
      })
  },
  follow(req, res) {
    Users.findByIdAndUpdate(req.payload.id, { $addToSet: { following: req.params.user } })
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: "Could not follow user" })
      })
  },
  unfollow(req, res) {
    Users.findByIdAndUpdate(req.payload.id, { $pop: { following: req.params.user } })
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: "Could not unfollow user" })
      })
  },
}