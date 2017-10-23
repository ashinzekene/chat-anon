const express = require('express');
const Circles = require('../models/circle');
const Users = require('../models/user');

const router = express.Router();

router.param('circle', (req, res, next, id) => {
  Circles.findById(id, (err, circle) => {
    if (err || !circle) {
      res.status(404).json({ error: 'No circle found' });
      return;
    }
    req.circle = circle;
    next();
  });
});

router.param('fellow', (req, res, next, id) => {
  Users.findById(id, (err, fellow) => {
    if (err || !fellow) {
      res.status(404).json({ error: 'No fellow found' });
      return;
    }
    req.fellow = fellow;
    next();
  });
});

// Get all circles
router.route('/')
  .get((req, res) => {
    Circles.find((err, circles) => {
      if (err) {
        console.log(err);
        return res.status(501);
      }
      return res.json(circles);
    });
  })
  .post((req, res, next) => {
    Circles.create(req.body, (err, circle) => {
      if (err) return next(err);
      return res.json(circle);
    });
  });


// SINGLE CIRCLE
router.route('/:circle')
  .get((req, res) => {
    res.json(req.circle);
  })
  .post((req, res) => {
    const newCircle = Object.assign({}, req.circle, req.body);
    Circles.findByIdAndUpdate(req.circle._id, { $set: { newCircle } }, (err, circle) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.json(circle);
    });
  }).delete((req, res) => {
    Circles.findByIdAndRemove(req.circle._id, (err, circle) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.json(circle);
    });
  });


// !!!!!!!!!!!!!!!!!!!! verify admin

router.route('/:circle/fellow/:fellow')
  .post((req, res) => {
    if (req.circle.isFellow(req.fellow._id)) {
      return res.status(401).json({ err: 'The user is already a fellow' });
    }
    req.fellow.addToFellow(req.circle._id);
    req.circle.addFellow(req.fellow._id);
    console.log('Fellow added');
    return res.json(req.circle);
  }).delete((req, res) => {
    req.fellow.removeFromFellow(req.circle._id);
    req.circle.removeFellow(req.fellow._id);
    console.log('Fellow removed');
    return res.json(req.circle);
  });


router.route('/:circle/admin/:fellow')
  .post((req, res) => {
    if (req.circle.isFellow(req.fellow._id)) {
      return res.status(401).json({ err: 'The user is already an admin' });
    }
    req.fellow.addToAdmin(req.circle._id);
    req.circle.addAdmin(req.fellow._id);
    console.log('Admin added');
    return res.json(req.circle);
  }).delete((req, res) => {
    req.fellow.removeFromAdmin(req.circle._id);
    req.circle.removeAdmin(req.fellow._id);
    console.log('Admin removed');
    return res.json(req.circle);
  });


module.exports = router;
