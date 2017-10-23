const mongoose = require('mongoose');

const { Schema } = mongoose;

const optionSchema = new Schema({
  option: String,
  votes: Number,
});

const pollSchema = new Schema({
  question: String,
  comment: String,
  appropriate: Number,
  in_appropriate: Number,
  circle: {
    type: Schema.Types.ObjectId,
    ref: 'Circle',
  },
  options: [optionSchema],
}, { timestamps: true });

pollSchema.virtual('isAppropriate').get(function () {
  return this.appropriate.length > this.in_appropriate.length;
});

pollSchema.methods.markAppropriate = function (user) {
  if (!this.appropriate.some(id => id === user)) {
    this.appropriate.push(user);
  }
  this.save();
};

pollSchema.methods.markInAppropriate = function (user) {
  if (!this.appropriate.some(id => id === user)) {
    this.appropriate.push(user);
  }
  this.save();
};

module.exports = mongoose.model('Poll', pollSchema);
