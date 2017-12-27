const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    minlength: 5
  },
  avatar_url: String,
  first_name: String,
  last_name: String,
  password: {
    type: String,
  },
  gender: {
    type: String,
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

userSchema.methods.hasStarred = function (poll) {
  return this.voted_polls.some(id => `${id}` === `${poll}`);
};

userSchema.methods.hasVoted = function (poll) {
  return this.voted_polls.some(id => `${id}` === `${poll}`);
};

userSchema.methods.isFollowing = function (userId) {
  return this.following.some(id => `${id}` === `${userId}`);
};

userSchema.static('findByUsername', function (username, cb) {
  return this.find({ username }, cb);
});

userSchema.static('findByEmail', function (email, cb) {
  return this.find({ email }, cb);
});

userSchema.methods.toJSONFor = function (user) {
  if (!user) {
    return {
      username: this.username,
      avatar_url: this.avatar_url,
      first_name: this.first_name,
      gender: this.gender,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
    }
  }
  return {
      username: this.username,
      avatar_url: this.avatar_url,
      first_name: this.first_name,
      gender: this.gender,
      myFollower: user.isFollowing(this._id),
      followingMe: this.following.some(id => `${id}` === `${user._id}`),
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
    };
    // following: this.following.toProfileJSONFor(user)
};

const User = mongoose.model('User', userSchema);

module.exports = User;
