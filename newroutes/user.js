const express = require('express');
const user = require('../controllers/users')
const { fellowPoll, auth } = require('./middlewares');

const router = express.Router();

router.route('/')
  .get(user.get)
  .put(user.update)
  .post(user.create)
  .delete(user.delete);

router.route('/all')
  .get(user.all)

router.post('/:poll/star', fellowPoll(), user.starPoll);

router.get('/:user', user.getUser)

router.route('/:user/follow')
  .post(user.follow)
  .delete(user.unfollow)
module.exports = router;
