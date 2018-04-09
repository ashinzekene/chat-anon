const bcrypt = require('bcrypt-nodejs');

const isProduction = process.env.NODE_ENV === 'production';
const SALT_FACTOR = process.env.SALT_FACTOR || 5;


function hash(whatToHash) {
  const salt = bcrypt.genSaltSync(SALT_FACTOR);
  return bcrypt.hashSync(whatToHash, salt);
}

function allowAdminPoll(err) {
  return (req, res, next) => {
    if (!req.user.admin_circles.some(circle => circle === req.poll.circle)) {
      const result = err || 'You cannot modify this poll, you are not an admin';
      res.status(401).json(result);
      return;
    }
    next();
  };
}

function allowFellowPoll(err) {
  return (req, res, next) => {
    if (!req.user.circles.some(circle => circle === req.poll.circle) === -1) {
      const result = err || 'You cannot access this poll, you are not a fellow';
      res.status(401).json(result);
      return;
    }
    next();
  };
}


function allowAdminCircle() {
  return (req, res, next) => {
    if (!req.fellow.admin_circles.some(circle => circle === req.circle._id) === -1) {
      res.status(401).json('You cannot modify this circle, you are not an admin');
      return;
    }
    next();
  };
}

function allowFellowCircle() {
  return (req, res, next) => {
    if (!req.fellow.circles.some(circle => circle === req.circle._id) === -1) {
      res.status(401).json('You cannot access this circle, you are not a fellow');
      return;
    }
    next();
  };
}

module.exports = {
  SALT_FACTOR,
  hash,
  bcrypt,
  isProduction,
  allowFellowPoll,
  allowAdminPoll,
  allowFellowCircle,
  allowAdminCircle,
};
