const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  first_name: String,
  last_name: String,
  password: String,
  email_address: {
    type: String,
    unique: true,
  },
  starred_polls: [{
    type: Schema.Types.ObjectId,
    unique: true,
    ref: 'Poll',
  }],
  answered_polls: [{
    type: Schema.Types.ObjectId,
    unique: true,
    ref: 'Poll',
  }],
  admin_circles: [{
    type: Schema.Types.ObjectId,
    unique: true,
    ref: 'Circle',
  }],
  circles: [{
    type: Schema.Types.ObjectId,
    unique: true,
    ref: 'Circle',
  }],
}, { timestamps: true });

userSchema.methods.answeredPoll = function (poll) {
  if (this.answered_polls.findIndex(id => `${id}` === `${poll}`) === -1) {
    this.answered_polls.push(poll);
  }
  return this.save();
};

userSchema.methods.starPoll = function (poll) {
  if (this.starred_polls.findIndex(id => `${id}` === `${poll}`) === -1) {
    this.starred_polls.push(poll);
  }
  return this.save();
};


userSchema.methods.unStarPoll = function (poll) {
  this.starred_polls.remove(poll);
  return this.save();
};

userSchema.methods.addToFellow = function (circle) {
  if (this.circles.findIndex(id => `${id}` === `${circle}`) === -1) {
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
  if (this.admin_circles.findIndex(id => `${id}` === `${circle}`) === -1) {
    this.admin_circles.push(circle);
  }
  return this.save();
};

userSchema.methods.removeFromAdmin = function (circle) {
  this.admin_circles.remove(circle);
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
