const express = require('express');
const user = require('../controllers/users')
const { fellowPoll, auth } = require('./middlewares');

const router = express.Router();

router.route('/')
  .get(user.get)
  .put(user.update)
  .post(user.create)
  .delete(user.delete);

router.get('/all', user.all)
router.post('/login', user.login)

router.get('/search', user.search)

router.post('/verify_mail', user.verifyEmail)
router.post('/verify_username', user.verifyUsername)

router.post('/:poll/star', fellowPoll(), user.starPoll);

router.get('/:user', user.getUser)

router.route('/:user/follow')
  .post(user.follow)
  .delete(user.unfollow)
module.exports = router;
