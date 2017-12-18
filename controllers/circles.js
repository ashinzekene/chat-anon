const Circles = require('../models/circle')

module.exports = {
  get(req, res) {
    Circles.findOne({ handle: req.params.circle })
      .then(circle => {
        res.json(circle)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: 'Could not get circle'})
      })
  },
  search(req, res) {
    Circles.find({ handle: req.query.q })
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
    Circles.find({ fellows: { $in: [req.payload.id] } })
      .then(circles => {
        res.json(circles)
      })
      .catch(err => {
        console.log(err)
        res.ststus(403).jso({ err: 'Could not get all your cirlces' })
      })
  },
  _all(req, res) {
    Circles.find({}, {
      name:1,
      handle:1,
      description:1,
      creator: 1,
      fellows:1
    })
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
    const newCircle = Object.assign({}, req.body, { creator: req.payload.id, admin: req.payload.id })
    Circles.create(newCircle)   
      .then(circle => {
        res.json(circle)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: 'Could not create circle' })
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
}