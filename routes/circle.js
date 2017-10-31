const express = require('express');
const Circles = require('../models/circle');
const Users = require('../models/user');
const { adminCircle, fellowCircle, auth } = require('./middlewares');

const router = express.Router();

function handleError(res, err = 'An error occurred') {
  return (error) => {
    console.log(error);
    return res.status(403).json({ err });
  };
}

router.param('circle', (req, res, next, id) => {
  Circles.findById(id, (err, circle) => {
    if (err || !circle) {
      console.log(circle, id);
      res.status(404).json({ error: 'No circle found' });
      return;
    }
    req.circle = circle;
    next();
  });
});

router.param('fellow', (req, res, next, id) => {
  Users.findById(id, (err, fellow) => {
    if (err || !fellow) {
      res.status(404).json({ error: 'No fellow found' });
      return;
    }
    req.fellow = fellow;
    next();
  });
});

// Ensure anyone accessing these routes is authenticated
router.use(auth.required());

// Get all circles
router
  .route('/')
  .get((req, res) => {
    // GETTING A FELLOW'S CIRCLES
    Circles.find()
      .where('_id')
      .in(req.payload.circles)
      .exec((err, circles) => res.json(circles))
      .catch(handleError(res));
  })
  .post((req, res) => {
    // CREATING A CIRCLE
    req.body.creator = req.payload._id;
    req.body.fellows = [req.payload._id];
    req.body.admins = [req.payload._id];
    Circles.create(req.body).then((circle) => {
      Users.findByIdAndUpdate(req.payload._id, {
        $addToSet: { admin_circles: circle._id, circles: circle._id },
      })
        .then(user => res.json(circle));
    }).catch(handleError(res, 'This circle probably already exists'));
  });

router.get('/all', (req, res) => {
  Circles.find((err, circles) => res.json(circles));
});

/**
 * WOULD OPEN THIS ROUTE FOR ANY LOGGED IN USER, DATA RETURNED WOULD DIFFER ON TYPEOF USER
 *
 */
router
  .route('/:circle')
  // GET A CIRCLE
  /**
   * YOU SHOULD FETCH OTHER DETAILS FOR USERS
   *
   */
  .get(fellowCircle, (req, res) => {
    res.json(req.circle);
  })
  .post(adminCircle, (req, res) => {
    // EDITING A CIRCLE
    const newCircle = Object.assign({}, req.body);
    Circles.findByIdAndUpdate(req.circle._id, { $set: newCircle })
      .then(circle => res.json(circle))
      .catch(handleError(res));
  })
  .delete(adminCircle, (req, res) => {
    // DELETING A CIRCLE
    Users.findByIdAndUpdate(req.payload._id, {
      $popAll: { admin_circles: req.params.circle, circles: req.params.circle },
    }).then(() => {
      Circles.findByIdAndUpdate(req.params.circle, {
        $popAll: {
          admin_circles: req.params.circle,
          circles: req.params.circle,
        },
      })
        .then(users => res.json(users))
        .catch(handleError(res));
    });
  });

router.route('/:circle/join').post((req, res) => {
  // BECOMING A CIRCLE INVITEE
  if (req.circle.isInvitee(req.payload._id)) {
    return res.status(400).json({ err: 'The user is already an invitee' });
  }
  req.circle.addInvitee(req.payload._id);
  req.payload.addToInvitee(req.circle._id);
  return res.json(req.circle);
});

/**
 *  PRESENTLY ANY LOGGEDIN CAN SEE USERS IN A GROUP
 *
 */
router.route('/:circle/fellows').get((req, res) => {
  Circles.find({ _id: req.params.circle })
    .populate('fellows')
    .select('fellows')
    .exec()
    .then(fellows => res.json(fellows))
    .catch(handleError(res));
});

router
  .route('/:circle/invitee/:fellow')
  .all(adminCircle)
  .post((req, res) => {
    // ADDING TO A CIRCLE INVITEE
    if (req.circle.isInvitee(req.fellow._id)) {
      return res.status(400).json({ err: 'The user is already am invitee' });
    }
    req.circle.addInvitee(req.fellow._id);
    req.fellow.addToInvitee(req.circle._id);
    return res.json(req.circle);
  })
  .delete(adminCircle, (req, res) => {
    // REMOVING A CIRCLE INVITEE
    req.circle.removeInvitee(req.fellow._id);
    req.fellow.removeFromInvitee(req.circle._id);
    return res.json(req.circle);
  });

router
  .route('/:circle/fellow/:fellow')
  .all(adminCircle)
  .post((req, res) => {
    // ADDING A USER TO A CIRCLE
    if (req.circle.isFellow(req.fellow._id)) {
      return res.status(400).json({ err: 'The user is already a fellow' });
    }
    req.fellow.removeFromInvitee(req.circle._id);
    req.circle.removeInvitee(req.fellow._id);
    req.fellow.addToFellow(req.circle._id);
    req.circle.addFellow(req.fellow._id);
    return res.json(req.circle);
  })
  .delete((req, res) => {
    // REMOVING A USER FROM A CIRCLE
    req.fellow.removeFromFellow(req.circle._id);
    req.circle.removeFellow(req.fellow._id);
    return res.json(req.circle);
  });

router
  .route('/:circle/admin/:fellow')
  .all(adminCircle)
  .post((req, res) => {
    // ADDING AN ADMIN TO A CIRCLE
    if (req.circle.isAdmin(req.fellow._id)) {
      return res.status(400).json({ err: 'The user is already an admin' });
    }
    req.fellow.addToAdmin(req.circle._id);
    req.fellow.addToFellow(req.circle._id);
    req.circle.addAdmin(req.fellow._id);
    req.circle.addFellow(req.fellow._id);
    return res.json(req.circle);
  })
  .delete((req, res) => {
    // REMOVING AN ADMIN FROM A CIRCLE
    req.fellow.removeFromAdmin(req.circle._id);
    req.circle.removeAdmin(req.fellow._id);
    return res.json(req.circle);
  });

module.exports = router;
