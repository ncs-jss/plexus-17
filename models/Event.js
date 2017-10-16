const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const MediaSchema = require('./schema/Media');
const WinnerSchema = require('./schema/Winner');

const EventSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  enquiry: {
    type: String,
    required: true
  },
  rules: [{
    type: String,
    trim: true
  }],
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  state: {
    type: 'String',
    enum: ['running', 'ended', 'toStart', 'blocked'],
    required: true
  },
  eventPrefs: [{
    type: String,
    enum: ['leaderboard', 'variableWeightage', 'skippable']
  }],
  createdBy: {
    type: 'String',
    enum: ['individual', 'society'],
    required: true
  },
  winners: [WinnerSchema],
  media: [MediaSchema],
  prizes: {
    type: Array
  },
  _editors: [{
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  }],
  verified: {
    type: Boolean,
    default: false
  },
  flag: {
    type: Boolean,
    default: false
  }
}, {
    timestamps: true
})

module.exports = mongoose.model('Event', EventSchema);
