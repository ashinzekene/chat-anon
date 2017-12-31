const mongoose = require('mongoose');

const { Schema } = mongoose;

const optionSchema = new Schema({
  option: String,
  votes: Number
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

pollSchema.methods.vote = function (option) {
  this.options.map((options) => {
    if (`${options._id}` === `${option}`) {
      options.votes += 1;
    }
    return options;
  });
  return this.save();
};

pollSchema.methods.toJSONFor = function (user) {
  return {
    _id: this._id,
    appropriate: this.appropriate,
    question: this.question,
    comment: this.comment,
    creator: this.creator,
    circle: this.circle,
    createdAt: this.createdAt, 
    updatedAt: this.updatedAt, 
    otions: this.options,
    hasVoted: user.hasVoted(this._id)
  }
};

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
