const Polls = require('../models/poll');

module.exports = {
  get(req, res) {
    Polls.findById(req.params.id)
      .then(poll => {
        res.json(poll)
      })
      .catch(err => {
        res.status(403).json({ err: 'Could not get poll' })
      })
  },
  _all(req, res) {
    Polls.find()
      .then(poll => {
        res.json(poll)
      })
      .catch(err => {
        res.status(403).json({ err: 'Could not get all polls:::' })
      })
  },
  create(req, res) {
    Polls.create(req.body)
      .then(poll => {
        res.json(poll)
      })
      .catch(err => {
        res.status(403).json({ err: "Could not create poll" })
      })
  },
  delete(req, res) {
    Polls.findByIdAndRemove(req.body.id)
      .then(poll => {
        res.json(poll)
      })
      .catch(err => {
        res.status(403).json({ err: "Could not delete poll" })
      })
  },
  appropriate(req, res) {
    Polls.findByIdAndUpdate(req.body.id, { $addToSet: { appropriate: req.user.id }, $pop: { inappropriate: req.user.id } })
      .then(poll => {
        res.json(poll)
      })
      .catch(err => {
        res.status(403).json({ err: "Could not delete poll" })
      })
  },
  inappropriate(req, res) {
    Polls.findByIdAndUpdate(req.body.id, { $addToSet: { inappropriate: req.user.id }, $pop: { appropriate: req.user.id } })
      .then(poll => {
        res.json(poll)
      })
      .catch(err => {
        res.status(403).json({ err: "Could not delete poll" })
      })
  },
  edit(req, res) {
    Polls.findByIdAndUpdate(req.body.id)
      .then(poll => {
        res.json(poll)
      })
      .catch(err => {
        res.status(403).json({ err: "Could not update poll" })
      })
  },
  vote(req, res) {
    Polls.findOneAndUpdate(
      { _id: req.params.id,
        "options.id": req.body.option,
      },
      { $addToSet: { "options.$.votes": req.user.id } })
  },
  unVote(req, res) {
    Polls.findOneAndUpdate(
      { _id: req.params.id,
        "options.id": req.body.option,
       },
      { $pop: { "options.$.votes": req.user.id } })
  },
}