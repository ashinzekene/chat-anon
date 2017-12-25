const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    minlength: 5
  },
  avatar_url:String,
  first_name: String,
  last_name: String,
  password: {
    type: String,
  },
  gender: {
    enum: ['male', 'female', 'others']
  },
  email: {
    type: String,
    unique: true,
  },
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  starred_polls: [{
    type: Schema.Types.ObjectId,
    ref: 'Poll',
  }],
  voted_polls: [{
    type: Schema.Types.ObjectId,
    ref: 'Poll',
  }],
}, { timestamps: true });


userSchema.methods.createdByMe = function (poll) {
  return this.created_polls.some(id => `${id}` === `${poll}`);
};

userSchema.methods.isAdmin = function (circle) {
  return this.admin_circles.some(id => `${id}` === `${circle}`);
};

userSchema.methods.isFellow = function (circle) {
  return this.circles.some(id => `${id}` === `${circle}`);
};

userSchema.methods.hasStarred = function (poll) {
  return this.voted_polls.some(id => `${id}` === `${poll}`);
};

userSchema.methods.hasVoted = function (poll) {
  return this.voted_polls.some(id => `${id}` === `${poll}`);
};

userSchema.methods.vote = function (poll) {
  if (!this.voted_polls.some(id => `${id}` === `${poll}`)) {
    this.voted_polls.push(poll);
  }
  return this.save();
};

userSchema.methods.createPoll = function (poll) {
  if (!this.created_polls.some(id => `${id}` === `${poll}`)) {
    this.created_polls.push(poll);
  }
  return this.save();
};

userSchema.methods.uncreatePoll = function (poll) {
  this.created_polls.remove(poll);
  return this.save();
};

userSchema.methods.starPoll = function (poll) {
  if (!this.starred_polls.some(id => `${id}` === `${poll}`)) {
    this.starred_polls.push(poll);
  }
  return this.save();
};

userSchema.methods.unStarPoll = function (poll) {
  this.starred_polls.remove(poll);
  return this.save();
};

userSchema.methods.addToFellow = function (circle) {
  if (!this.circles.some(id => `${id}` === `${circle}`)) {
    this.circles.push(circle);
  }
  return this.save();
};

userSchema.methods.removeFromFellow = function (circle) {
  this.circles.remove(circle);
  this.admin_circles.remove(circle);
  return this.save();
};

userSchema.methods.addToAdmin = function (circle) {
  if (!this.admin_circles.some(id => `${id}` === `${circle}`)) {
    this.admin_circles.push(circle);
  }
  return this.save();
};

userSchema.methods.removeFromAdmin = function (circle) {
  this.admin_circles.remove(circle);
  return this.save();
};

userSchema.methods.addToInvitee = function (circle) {
  if (!this.invitee_circles.some(id => `${id}` === `${circle}`)) {
    this.invitee_circles.push(circle);
  }
  return this.save();
};

userSchema.methods.removeFromInvitee = function (circle) {
  this.invitee_circles.remove(circle);
  return this.save();
};

userSchema.statics.addToAdmin = function (userID, circleID, cb) {
  return this.findByIdAndUpdate(userID, { $addToSet: { admins_circles: circleID, circles: circleID } }, cb);
};

userSchema.statics.addToFellow = function (userID, circleID, cb) {
  return this.findByIdAndUpdate(userID, { $addToSet: { circles: circleID } }, cb);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
