const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const MediaSchema = new Schema({
  type: {
    type: String,
    enum: ['img', 'yt', 'other']
  },
  mediaUrl: {
    type: String,
    trim: true
  }
})

module.exports = MediaSchema;
