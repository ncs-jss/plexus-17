const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

const MediaSchema = require('./schema/Media');

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    username: {
      type: String,
      trim: true,
      lowercase: true
    },
    avatar: MediaSchema,
    email: {
      type: String,
      trim: true,
      required: true
    },
    phoneNo: {
      type: String,
      trim: true
    },
    authId: {
      type: Array,
      trim: true
    },
    admNo: {
      type: String,
      trim: true
    },
    token: {
      type: String,
      trim: true,
      default: ''
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'editor', 'user'],
      default: 'user'
    },
    type: {
      type: String,
      enum: ['individual', 'societyMember', 'societyExec']
    },
    _society: {
      type: ObjectId,
      ref: 'Society'
    },
    _arena: [
      {
        type: ObjectId,
        ref: 'Arena'
      }
    ],
    verified: {
      type: Boolean,
      default: false
    },
    flag: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.addUser = (profile, callback) => {
  return new User({
    authId: profile.id,
    name: profile.displayName,
    email: profile.emails[0].value,
    avatar: {
      url: profile.photos[0].value
    }
  }).save();
}

