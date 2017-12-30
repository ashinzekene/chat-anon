const Users = require('../models/user')

module.exports = {
  get(req, res) {
    Users.findById(req.user._id, "-password")
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: 'Could not get yourself' })
      })
  },
  login(req, res) {
    let { username, password } = req.body
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
  verify(req, res) {
    Users.find(req.body, {
      _id: 0,
      email: 1,
    })
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: 'Could not get the requested user' })
      })
  },
  verifyEmail(req, res) {
    Users.find({ email: req.body.email }, {
      _id: 0,
      email: 1,
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
    Users.find({ username: req.body.username }, {
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
    Users.findOne({ username: req.params.user }, "-password")
      .then(user => {
        res.json(user.toJSONFor(req.user))
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
    Users.findByIdAndRemove(req.user._id)
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: 'Could not delete your account' })
      })
  },
  create(req, res) {
    console.log(req.body)
    let user = {}
    let { username, email, password } = req.body
    user.username = username
    user.email = email
    user.password = password
    let newUser = new Users(user)
    newUser.save((err, user) => {
      if (user) {
        return res.json(user)
      } else {
        res.status(403).json({ err: 'Could not create account' })
      }
    })
    // Users.create(user, { password: 0 })
    //   .then(user => {
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  },
  update(req, res) {
    let { first_name, last_name, gender, theme } = req.body
    console.log(req.body)
    Users.findByIdAndUpdate(req.user._id, { first_name, last_name, gender, theme }, { new: true })
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        console.log(err)
        res.json({ err: 'Could not update your account' })
      })
  },
  starPoll(req, res) {
    Users.findByIdAndUpdate(req.user._id, { $addToSet: { starred_polls: req.body.poll } })
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: "Could not star poll" })
      })
  },
  unstarPoll(req, res) {
    Users.findByIdAndUpdate(req.user._id, { $pop: { starred_polls: req.body.poll } })
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: "Could not unstar poll" })
      })
  },
  follow(req, res) {
    Users.findByIdAndUpdate(req.user._id, { $addToSet: { following: req.params.user } })
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: "Could not follow user" })
      })
  },
  unfollow(req, res) {
    Users.findByIdAndUpdate(req.user._id, { $pop: { following: req.params.user } })
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: "Could not unfollow user" })
      })
  },
  following(req, res) {
    Users.findOne({ username: req.params.user }, "following")
      .populate("following", "username first_name last_name")
      .then(user => {
        console.log(user.following)
        res.json(user.following)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: "Could not get following" })
      })
  },
  followers(req, res) {
    Users.findOne({ username: req.params.user }, "_id username")
      .then(user => {
        Users.find({ following: user._id }, "username first_name last_name")
          .then(users => {
            res.json(users)
          })
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: "Could not get following" })
      })
  },
  byUsername(req, res) {
    Users.findOne({ username: req.params.user })
      .then(user => {
        res.json(user)
      })
      .catch(console.log)
  }
}