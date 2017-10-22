const mongoose = require('mongoose');

const { Schema } = mongoose;

const circleSchema = new Schema({
  name: String,
  description: String,
  fellows: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  invited: [{
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


module.exports = mongoose.model('Circle', circleSchema);
