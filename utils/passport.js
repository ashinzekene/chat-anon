const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');

const Users = require('../models/user');

const ExtractJWT = passportJWT.ExtractJwt;

const JWTStrategy = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('token'),
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

function signJWT(id, role) {
  return jwt.sign({ id, role }, jwtOptions.secretOrKey, { expiresIn: jwtOptions.expiresIn });
}
passport.use(new JWTStrategy(jwtOptions, (payload, done) => {
  Users.findById(payload.id, (err, user) => {
    if (err) return done(err);
    if (user) return done(null, user);
    return done();
  });
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
