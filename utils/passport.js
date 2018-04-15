const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');

const Users = require('../models/user');

const ExtractJWT = passportJWT.ExtractJwt;

const JWTStrategy = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PASSPORT_SECRET || 'secret',
  expiresIn: '14d',
  // issuer = 'vdcoupon.com',
  // audience = 'vdcoupon.ncom',
};
const requireAuth = passport.authenticate('jwt', { session: false });

function extractPayload(req, res, next) {
  if (typeof req.headers !== 'object') {
    return next();
  }
  // res.token = req.headers.authorization.split(' ')[1];
  [, res.token] = req.headers.authorization.split(' ');
  res.payload = jwt.verify(res.token, jwtOptions.secretOrKey);
  return next();
}

function signJWT(id, username) {
  return jwt.sign({ id, username }, jwtOptions.secretOrKey, { expiresIn: jwtOptions.expiresIn });
}

passport.use(new JWTStrategy(jwtOptions, (payload, done) => {
  console.log("Authing user", payload)
  Users.findById(payload.id)
    .then(user => done(null, user))
    .catch(err => done)
}));


function allowAccess(...roles) {
  return (req, res, next) => {
    const present = roles.findIndex(role => role === res.payload.role);
    if (present === -1) return res.status(401).json({ result: 'You cannot access this route' });
    return next();
  };
}

function restrictAccess(...roles) {
  return (req, res, next) => {
    const present = roles.findIndex(role => role === res.payload.role);
    if (present > -1) return res.status(401).json({ result: 'You cannot access this route' });
    return next();
  };
}

function restrictToUsers(userId, payload) {
  if (userId === payload.id) return false;
  if (payload.role === 'admin' || 'agent') return false;
  return true;
}


module.exports = (app) => {
  if (app) app.use(passport.initialize());
  return {
    jwtOptions,
    requireAuth,
    extractPayload,
    signJWT,
    allowAccess,
    restrictAccess,
    restrictToUsers,
  };
};
