const mongoose = require('mongoose');

const { Schema } = mongoose;

const optionSchema = new Schema({
  option: String,
  votes: Number,
});

const pollSchema = new Schema({
  question: String,
  comment: String,
  stars: Number,
  appropriate: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  in_appropriate: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  circle: {
    type: Schema.Types.ObjectId,
    ref: 'Circle',
    required: true,
  },
  options: [optionSchema],
}, { timestamps: true });

pollSchema.virtual('isAppropriate').get(function () {
  return this.appropriate.length > this.in_appropriate.length;
});

pollSchema.query.forCircle = function (circle) {
  return this.find({ circle });
};

pollSchema.methods.markAppropriate = function (user) {
  if (this.appropriate.some(id => id === user)) {
    this.appropriate.push(user);
  }
  return this.save();
};

pollSchema.methods.markInAppropriate = function (user) {
  if (!this.appropriate.some(id => id === user)) {
    this.appropriate.push(user);
  }
  return this.save();
};

pollSchema.methods.vote = function (option) {
  this.options.map((options) => {
    if (`${options._id}` === `${option}`) {
      options.votes += 1;
    }
    return options;
  });
  return this.save();
};

pollSchema.methods.forUser = function (user) {
  return Object.assign({}, this, { hasVoted: user.hasVoted() }, { starred: user.hasStarred() }, { created: user.createdByMe() });
};

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
