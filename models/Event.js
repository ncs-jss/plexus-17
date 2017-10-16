const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const MediaSchema = require('./schema/Media');
const WinnerSchema = require('./schema/Winner');

const EventSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  enquiry: {
    type: String
  },
  rules: [{
    type: String,
    trim: true
  }],
  startTime: {
    type: Date
  },
  endTime: {
    type: Date
  },
  state: {
    type: 'String',
    enum: ['running', 'ended', 'toStart', 'blocked']
  },
  needToken: {
    type: Boolean,
    default: False
  },
  needLeaderboard: {
    type: Boolean,
    default: True
  },
  createdBy: {
    type: 'String',
    enum: ['individual', 'society']
  },
  winners: [WinnerSchema],
  media: [MediaSchema],
  prizes: {
    type: Array
  },
  _editors: [{
    type: Schema.ObjectId,
    ref: 'User'
  }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Event', EventSchema);
