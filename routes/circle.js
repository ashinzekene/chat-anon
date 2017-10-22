const express = require('express');
const Circle = require('../models/user');

const router = express.Router();

router.param('circle', (req, res, next, id) => {
  Circle.findById(id, (err, circle) => {
    req.circle = circle;
  });
});


router.get('/', (req, res) => {
  Circle.find((err, circles) => {
    if (err) {
      console.log(err);
      return res.status(501);
    }
    return res.json(circles);
  });
});

router.get('/:circle', (req, res) => {
  res.json(req.circle);
});

router.post('/', (req, res, next) => {
  Circle.create(req.body, (err, circle) => {
    if (err) return next(err);
    return res.json(circle);
  });
});


module.exports = router;
