const mongoose = require('mongoose');
const {
  Schema
} = mongoose;
const MediaSchema = require('./schema/Media');
const ArenaSchema = new Schema({
  _event: {
    type: Schema.ObjectId,
    ref: 'Event'
  },
  score: {
    type: Number,
    default: 0
  },
  scoreSystem: {
    type: String,
    enum: ['points']
  },
  _user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  questions: {
    data: [{
      _question: {
        type: Schema.ObjectId,
        ref: 'Question'
      },
      state: {
        type: String,
        enum: ['correct', 'incorrect', 'unattempted']
      },
      givenAns: {
        type: String
      }
    }],
    questionIndex: {
      type: Number,
      default: 0
    },
    submittedTime: {
      type: Date
    },
  },
  flag: {
    type: Boolean,
    default: false
  }
})
module.exports = mongoose.model('Arena', ArenaSchema);
