const router = require('express').Router();
const { extractUser } = require('./middlewares');

router.get('/', (req, res) => res.json({ hi: 'ok' }));
router.use(extractUser);
router.use('/circles', require('./circle'));
router.use('/polls', require('./poll'));
router.use('/users', require('./user'));

module.exports = router;
