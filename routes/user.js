const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    User.find((err, users) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.json(users);
    });
  })
  .post((req, res) => {
    User.create(req.body, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.json(user);
    });
  });

router.route('/:user')
  .get((req, res) => {
    res.json(req.params.user);
  })
  .post((req, res) => {
    User.findByIdAndUpdate(req.params.user, { $set: req.body }, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(501).json('Could not update user');
      }
      if (!user) {
        console.log(err);
        return res.status(401).json('User not found');
      }
      return res.json(user);
    });
  })
  .delete((req, res) => {
    User.findByIdAndRemove(req.params.user, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json('Could not delete user');
      }
      if (!user) {
        console.log(err);
        return res.status(401).json('User not found');
      }
      return res.json(user);
    });
  });

module.exports = router;
