const Polls = require('../models/poll');

module.exports = {
  get(req, res) {
    Polls.findById(req.params.poll)
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
    Polls.findByIdAndRemove(req.params.poll)
      .then(poll => {
        res.json(poll)
      })
      .catch(err => {
        res.status(403).json({ err: "Could not delete poll" })
      })
  },
  appropriate(req, res) {
    Polls.findByIdAndUpdate(req.params.poll, { $addToSet: { appropriate: req.payload.id }, $pop: { inappropriate: req.payload.id } })
      .then(poll => {
        res.json(poll)
      })
      .catch(err => {
        res.status(403).json({ err: "Could not delete poll" })
      })
  },
  inappropriate(req, res) {
    Polls.findByIdAndUpdate(req.params.poll, { $addToSet: { inappropriate: req.payload.id }, $pop: { appropriate: req.payload.id } })
      .then(poll => {
        res.json(poll)
      })
      .catch(err => {
        res.status(403).json({ err: "Could not delete poll" })
      })
  },
  edit(req, res) {
    Polls.findByIdAndUpdate(req.params.poll, req.body)
      .then(poll => {
        res.json(poll)
      })
      .catch(err => {
        res.status(403).json({ err: "Could not update poll" })
      })
  },
  vote(req, res) {
    Polls.findOneAndUpdate(
      { _id: req.params.poll,
        "options.id": req.body.option,
      },
      { $addToSet: { "options.$.votes": req.payload.id } })
  },
  unVote(req, res) {
    Polls.findOneAndUpdate(
      { _id: req.params.id,
        "options.id": req.body.option,
       },
      { $pop: { "options.$.votes": req.payload.id } })
  },
}