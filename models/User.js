const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    name: {
      type: String,
      trim: true
    },
    username: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    phoneNo: {
      type: String,
      trim: true
    },
    googleId: {
      type: String,
      trim: true
    },
    admissionNo: {
      type: String,
      trim: true
    },
    googleId: {
      type: String,
      trim: true
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'editor', 'user'],
      default: 'user'
    },
    _society: {
      type: Schema.Types.ObjectID
    }
    type: {
      type: String,
      enum: ['individual', 'societyMember', 'societyExec']
    },
    verified: {
      type: Boolean,
      default: false
    },
    flag: {
      type: Boolean,
      default: false
    }
});
module.exports = mongoose.model('User', UserSchema);
