const mongoose = require('mongoose');

const { Schema } = mongoose;

const circleSchema = new Schema({
  name: String,
  handle: {
    type: String,
    required: true,
    unique: true
  },
  avatar_url:String,
  description: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  fellows: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  invitees: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  admins: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  polls: [{
    type: Schema.Types.ObjectId,
    ref: 'Poll',
  }],
}, { timestamps: true });


circleSchema.methods.isAdmin = function (user) {
  return this.admins.findIndex(id => `${id}` === `${user}`) > -1;
};

circleSchema.methods.isFellow = function (user) {
  return this.fellows.findIndex(id => `${id}` === `${user}`) > -1;
};

circleSchema.methods.isInvitee = function (user) {
  return this.invitees.findIndex(id => `${id}` === `${user}`) > -1;
};

circleSchema.methods.addInvitee = function (user) {
  if (this.invitees.findIndex(id => `${id}` === `${user}`) === -1) {
    this.invitees.push(user);
  }
  return this.save();
};

circleSchema.methods.removeInvitee = function (user) {
  this.invitees.remove(user);
  return this.save();
};


circleSchema.methods.addAdmin = function (user) {
  if (this.admins.findIndex(id => `${id}` === `${user}`) === -1) {
    this.admins.push(user);
  }
  return this.save();
};

circleSchema.methods.removeAdmin = function (user) {
  this.admins.remove(user);
  return this.save();
};


circleSchema.methods.addFellow = function (user) {
  if (this.fellows.findIndex(id => `${id}` === `${user}`) === -1) {
    this.fellows.push(user);
  }
  return this.save();
};

circleSchema.methods.removeFellow = function (user) {
  this.fellows.remove(user);
  return this.save();
};


circleSchema.methods.addPoll = function (user) {
  if (this.polls.findIndex(id => `${id}` === `${user}`) === -1) {
    this.polls.push(user);
  }
  return this.save();
};

circleSchema.methods.removePoll = function (user) {
  this.polls.remove(user);
  return this.save();
};

circleSchema.statics.addFellow = function(circle_id, fellow_id, cb) {
  this.findByIdAndUpdate(circle_id, { $addToSet: { fellows: fellow_id } }, cb)
}

circleSchema.statics.addAdmin = function(circle_id, admin_id, cb) {
  this.findByIdAndUpdate(circle_id, { $addToSet: { fellows: admin_id, admins: admin_id } }, cb)
}

const Circle = mongoose.model('Circle', circleSchema);

module.exports = Circle;

