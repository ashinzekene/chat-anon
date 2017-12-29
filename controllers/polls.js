const Polls = require('../models/poll');
const Circles = require('../models/circle');

module.exports = {
  get(req, res) {
    Polls.findById(req.params.poll)
      .then(poll => {
        // let iPoll = { ...poll.toJSON(), hasVoted: req.user.hasVoted(poll._id)}
        // poll.toJSONFor(req.user)
        res.json(poll)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: 'Could not get poll' })
      })
  },
  all(req, res) {
    /**
     * 1. Get the circles of the selected user
     * 2. Select just their IDs
     * 3. Find all polls whose circles has any of those  
     */
    Circles.find({ fellows: { $in: [req.user._id]} }, "_id")
    .then(circles => {
      let circleIds = circles.map(circle => circle._id)
        Polls.find({ circle : { $in: circleIds } }, "-options")
          .populate("creator", "username")
          .populate("circle", "handle name")
          .then(polls => {
            res.json(polls)
          })
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
      { options: req.body.options.map(option => ({ votes: 0, option })) },
      { creator: req.user.id }
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
  circle(req, res) {
    Polls.find({ circle: req.params.circle }, "question comment creator stars")
      .populate("creator", "username first_name last_name")
      .then(polls => {
        res.json(polls)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: "Could not fetch polls for the given circle" })  
      })
  },
  appropriate(req, res) {
    Polls.findByIdAndUpdate(req.params.poll, { $addToSet: { appropriate: req.user.id }, $pop: { inappropriate: req.user.id } })
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
    Polls.findByIdAndUpdate(req.params.poll, { $addToSet: { inappropriate: req.user.id }, $pop: { appropriate: req.user.id } })
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
    Polls.findOneAndUpdate({ _id: req.params.poll, "options.id": req.body.option },
      { $inc: { "options.$.votes": 1 } })
      .then(poll => {
        res.json(poll)
      })
      .catch(err => {
        console.log(err)
        res.status(403).json({ err: "could not vote in poll" })
      })
  },
}