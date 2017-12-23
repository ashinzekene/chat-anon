const Polls = require('../models/poll');

module.exports = {
  get(req, res) {
    Polls.findById(req.params.poll)
      .then(poll => {
        res.json(poll)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: 'Could not get poll' })
      })
  },
  _all(req, res) {
    Polls.find({}, { circle: 1, question: 1, comment: 1, creator: 1 })
      .populate("circle", "name")
      .populate("creator", "username")
      .then(poll => {
        res.json(poll)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: 'Could not get all polls:::' })
      })
  },
  search(req, res) {
    Polls.find({ question: RegExp(req.query.q, "i") }, "question")
    .then(polls => {
      res.json(polls)
    })
    .catch(err => {
      console.log(err)
      res.atatus(403).json({ err: "could not search for polls" })
    })
  },
  create(req, res) {
    let newPoll = Object.assign(
      {},
      req.body,
      { options: req.body.options.map(option => { votes: [], option })},
      { creator: req.payload.id }
    )
    Polls.create(newPoll)
      .then(poll => {
        res.json(poll)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: "Could not create poll" })
      })
  },
  delete(req, res) {
    Polls.findByIdAndRemove(req.params.poll)
      .then(poll => {
        res.json(poll)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: "Could not delete poll" })
      })
  },
  appropriate(req, res) {
    Polls.findByIdAndUpdate(req.params.poll, { $addToSet: { appropriate: req.payload.id }, $pop: { inappropriate: req.payload.id } })
      .then(poll => {
        res.json(poll)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: "Could not delete poll" })
      })
  },
  search(req, res) {
    Polls.find({ handle: req.query.q })
    .limit(5)
    .then(polls =>{
      res.json(polls)
    })
    .catch(err => {
      console.log(err)
      res.atatus(403).json({ err: "could not search for polls" })
    })
  },
  inappropriate(req, res) {
    Polls.findByIdAndUpdate(req.params.poll, { $addToSet: { inappropriate: req.payload.id }, $pop: { appropriate: req.payload.id } })
      .then(poll => {
        res.json(poll)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: "Could not delete poll" })
      })
  },
  edit(req, res) {
    Polls.findByIdAndUpdate(req.params.poll, req.body)
      .then(poll => {
        res.json(poll)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: "Could not update poll" })
      })
  },
  vote(req, res) {
    Polls.findOneAndUpdate(
      { _id: req.params.poll,
        "options.id": req.body.option,
      },
      { $addToSet: { "options.$.votes": req.payload.id } })
      .then(poll => {
        res.json(poll)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: "could not vote in poll" })
      })
  },
  unVote(req, res) {
    Polls.findOneAndUpdate(
      { _id: req.params.id,
        "options.id": req.body.option,
       },
      { $pop: { "options.$.votes": req.payload.id } })
      .then(poll => {
        res.json(poll)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: "could not vote in poll" })
      })
  },
}