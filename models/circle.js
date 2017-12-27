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
  }]
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

circleSchema.methods.toJSONFor = function(user) {
  return {
    _id: this._id,
    handle: this.handle,
    name: this.name,
    creator: this.creator,
    fellows: this.fellows,
    invitees: this.invitees,
    admins: this.admins,
    description: this.description,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    isAdmin: this.isAdmin(user._id),
    isFellow: this.isFellow(user._id),
    isCreator: `${this.creator._id}` === `${user._id}`
  }
}
const Circle = mongoose.model('Circle', circleSchema);

module.exports = Circle;

