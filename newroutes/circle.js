const express = require('express');
const circle = require('../controllers/circles') 
const { extractUser, auth } = require('./middlewares');

const router = express.Router();

// Ensure anyone accessing these routes is authenticated
// router.use(auth.required());

router
  .route('/')
  .all(extractUser, auth.required)
  .get(circle.all)
  .post(circle.create);

// NOBODY SHOULD BE ABLE TO ACCESS THIS EXCEPT ME :smiling_imp
router.get('/all', circle._all)

router.get('/search', circle.search)

router
  .route('/:circle')
  .all(extractUser, auth.required)
  .get(circle.get)
  .post(circle.update) // Has to be an admin
  .delete(circle.delete); // Has to be an admin || Maybe shouldnot delete the group but exit it

router.get('/user/:user', circle.user)

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
