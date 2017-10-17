const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const MediaSchema = new Schema({
  type: {
    type: String,
    enum: ['img', 'yt', 'file', 'other'],
    default: 'img'
  },
  url: {
    type: String,
    trim: true
  }
});

module.exports = MediaSchema;
