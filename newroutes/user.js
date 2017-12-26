const express = require('express');
const user = require('../controllers/users')
const { fellowPoll, auth, extractUser } = require('./middlewares');

const router = express.Router();

router.route('/')
  .get(user.all)
  .put(user.update)
  .post(user.create)
  .delete(user.delete);

router.get('/me', extractUser, auth.required, user.get)

router.get('/all', user.all)
router.post('/login', user.login)

router.get('/:user/followers', extractUser, auth.required, user.followers)
router.get('/:user/following', extractUser, auth.required, user.following)

router.get('/search', user.search)

router.post('/verify', user.verify)
router.post('/verify_mail', user.verifyEmail)
router.post('/verify_username', user.verifyUsername)

router.post('/:poll/star', fellowPoll(), user.starPoll);

router.get('/:user', user.getUser)

router.route('/:user/follow')
  .all(extractUser, auth.required)
  .post(user.follow)
  .delete(user.unfollow)
module.exports = router;
