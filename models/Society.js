const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

const MediaSchema = require('./schema/Media');

const SocietySchema = new Schema(
  {
    name: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    logoUrl: MediaSchema,
    coverUrl: MediaSchema,
    _members: [
      {
        type: ObjectId,
        ref: 'User'
      }
    ],
    _execs: [
      {
        type: ObjectId,
        ref: 'User'
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

module.exports = mongoose.model('Society', SocietySchema);
