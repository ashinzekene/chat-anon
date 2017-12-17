const Circles = require('../models/circle')

module.exports = {
  get(req, res) {
    Circles.findById(id)
      .then(circle => {
        res.json(circle)
      })
      .catch(err => {
        res.status(403).json({ err: 'Could not get circle'})
      })
  },
  all(req, res) {
    Circles.find({ fellows: { $in: [req.user.id] } })
      .then(circles => {
        res.json(circles)
      })
      .catch(err => {
        res.ststus(403).jso({ err: 'Could not get all your cirlces' })
      })
  },
  _all(req, res) {
    Circles.find()
      .then(circle => {
        res.json(circle)
      })
      .catch(err => {
        res.status(403).json({ err: 'Could not get circle' })
      })
  },
  create(req, res) {
    Circles.create(req.body)   
      .then(circle => {
        res.json(circle)
      })
      .catch(err => {
        res.status(403).json({ err: 'Could not create circle' })
      })
  },
  update(req, res) {
    Circles.findByIdAndUpdate(req.params.id, req.body)
      .then(circle => {
        res.json(circle)
      })
      .catch(err => {
        res.status(403).json("could not update")
      })
  },
  addFellow(req, res) {
    Circles.findByIdAndUpdate(req.body.circle, { $addToSet: { fellows: req.body.user } })
      .then(circle => {
        res.json(circle)
      })
      .catch(err => {
        res.status(403).json("could not add Fellow")
      })
  },
  addAdmin(req, res) {
    Circles.findByIdAndUpdate(req.body.circle, { $addToSet: { admins: req.body.user } })
      .then(circle => {
        res.json(circle)
      })
      .catch(err => {
        res.status(403).json("could not add Admin")
      })
  },
  removeFellow(req, res) {
    Circles.findByIdAndUpdate(req.body.circle, { $pop: { fellows: req.body.user } })
      .then(circle => {
        res.json(circle)
      })
      .catch(err => {
        res.status(403).json("could not remove Fellow")
      })
  },
  removeAdmin(req, res) {
    Circles.findByIdAndUpdate(req.body.circle, { $pop: { admins: req.body.user } })
      .then(circle => {
        res.json(circle)
      })
      .catch(err => {
        res.status(403).json("could not remove Admin")
      })
  },
}