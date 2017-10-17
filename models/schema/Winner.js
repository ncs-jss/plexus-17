const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const WinnerSchema = new Schema({
  _user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  position: {
    type: Number,
    default: 1
  }
});

module.exports = WinnerSchema;
