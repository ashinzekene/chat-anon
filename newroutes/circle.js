const express = require('express');
const Circles = require('../models/circle')
const circle = require('../controllers/circles') 
const { adminCircle, fellowCircle, auth } = require('./middlewares');

const router = express.Router();

// Ensure anyone accessing these routes is authenticated
// router.use(auth.required());

router
  .route('/')
  .get(circle.all)
  .post(circle.create);

router.get('/all', circle._all)

router.get('/search', circle.search)

router
  .route('/:circle')
  .get(circle.get)
  .post(circle.update)
  .delete(circle.delete);

router
  .route('/:circle/fellows')
  .get(circle.fellows)
  .post(circle.addFellow)
  .delete(circle.removeFellow);

router
  .route('/:circle/admins')
  .post(circle.addAdmin)
  .delete(circle.removeAdmin);

module.exports = router;
