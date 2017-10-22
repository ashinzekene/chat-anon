const router = require('express').Router();

router.get('/', (req, res) => res.json({ hi: 'ok' }));
router.use('/circle', require('./circle'));

module.exports = router;
