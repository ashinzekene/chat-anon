const Circles = require('../models/circle')
const User = require('../models/user')

module.exports = {
  get(req, res) {
    Circles.findOne({ handle: req.params.circle })
      .populate("creator", "username")
      .then(circle => {
        res.json(circle.toJSONFor(req.user))
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: 'Could not get circle'})
      })
  },
  search(req, res) {
    console.log("Searching", req.query.q)
    Circles.find({ handle: RegExp(req.query.q, "i") }, "name handle")
    .limit(5)
    .then(circles => {
      res.json(circles)
    })
    .catch(err => {
      console.log(err)
      res.atatus(403).json({ err: "could not search for circles" })
    })
  },
  update(req, res) {
    Circles.findByIdAndUpdate(req.params.circle, req.body)
      .then(circle => {
        res.json(circle)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json("could not update")
      })
  },
  delete(req, res) {
    Circles.findByIdAndRemove(req.params.circle)
      .then(circle => {
        res.json(circle)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json("could not update")
      })
  },
  all(req, res) {
    Circles.find({ fellows: { $in: [req.user.id] } })
      .populate("creator", "username")
      .then(circles => {
        res.json(circles)
      })
      .catch(err => {
        console.log(err)
        res.ststus(403).json({ err: 'Could not get all your cirlces' })
      })
  },
  _all(req, res) {
    Circles.find({}, "name handle description creator fellows")
      .populate("creator", "username")
      .then(circles => {
        res.json(circles)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: 'Could not get circle' })
      })
  },
  create(req, res) {
    const newCircle = Object.assign({}, req.body, { creator: req.user.id, admins: [req.user.id], fellows: [ ...req.body.fellows, req.user.id] })
    Circles.create(newCircle)   
      .then(circle => {
        res.json(circle)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: 'Could not create circle' })
      })
    },
  fellows(req, res) {
    Circles.findById(req.params.circle, "fellows")
      .populate("fellows", "username first_name last_name")
      .then(circle => {
        res.json(circle.fellows)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: 'Could not fetch user for the circle' })
      })
  },
  addFellow(req, res) {
    Circles.findByIdAndUpdate(req.body.circle, { $addToSet: { fellows: req.params.fellow } })
      .then(circle => {
        res.json(circle)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json("could not add Fellow")
      })
  },
  addAdmin(req, res) {
    Circles.findByIdAndUpdate(req.body.circle, { $addToSet: { admins: req.params.fellow } })
      .then(circle => {
        res.json(circle)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json("could not add Admin")
      })
  },
  removeFellow(req, res) {
    Circles.findByIdAndUpdate(req.body.circle, { $pop: { fellows: req.params.fellow } })
      .then(circle => {
        res.json(circle)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json("could not remove Fellow")
      })
  },
  removeAdmin(req, res) {
    Circles.findByIdAndUpdate(req.body.circle, { $pop: { admins: req.params.fellow } })
      .then(circle => {
        res.json(circle)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json("could not remove Admin")
      })
  },
  user(req, res) {
    User.findOne({ username: req.params.user}, "_id username")
      .then(user => {
        Circles.find({ fellows: { $in: [user._id] } })
        .then(circles => {
          res.json(circles)
        })
      })
    .catch(err => {
      console.log(err)
      res.status(403).json({ err: 'Could not get user cirlces' })
    })
  }
}