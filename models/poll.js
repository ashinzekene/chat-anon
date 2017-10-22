const mongoose = require('mongoose');

const { Schema } = mongoose;

const optionSchema = new Schema({
  option: String,
  votes: Number,
});

const pollSchema = new Schema({
  question: String,
  comment: String,
  options: [optionSchema],
}, { timestamps: true });

module.exports = mongoose.model('Poll', pollSchema);
