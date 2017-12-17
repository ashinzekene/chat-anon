const express = require('express');
const circle = require('../controllers/circles') 
const { adminCircle, fellowCircle, auth } = require('./middlewares');

const router = express.Router();

// Ensure anyone accessing these routes is authenticated
router.use(auth.required());

router
  .route('/')
  .get(circle.all)
  .post(circle.create);

router.route('/all')
  .get(circle._all)
  // .delete()

router
  .route('/:circle')
  .get(circle.get)
  .post(circle.update)
  .delete(circle.delete);


router.route('/:circle/fellows').get((req, res) => {
  Circles.find({ _id: req.params.circle })
    .populate('fellows')
    .select('fellows')
    .exec()
    .then(fellows => res.json(fellows))
    .catch(handleError(res));
});

router
  .route('/:circle/fellow')
  .post(circle.addFellow)
  .delete(circle.removeFellow);

router
  .route('/:circle/admin')
  .post(circle.addAdmin)
  .delete(circle.removeAdmin);

module.exports = router;