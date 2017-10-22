const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  first_name: String,
  last_name: String,
  password: String,
  email_address: String,
  circles: [{
    type: Schema.Types.ObjectId,
    ref: 'Circle',
  }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

// eslint-disable-next-line
userSchema.methods.addToFollowers = function(id) {
  if (!this.followers.some(el => el === id)) {
    this.followers.push(id);
  }
  return this.save();
};
