const mongoose = require('mongoose');
const { Schema } = mongoose;

const MediaSchema = require('./schema/Media');

const QuestionSchema = new Schema(
  {
    text: {
      type: String,
      trim: true,
      required: true
    },
    media: MediaSchema,
    type: {
      type: String,
      enum: ['shortAns', 'para', 'options', 'file']
    },
    options: [
      {
        text: String,
        imageUrl: String
      }
    ],
    flag: {
      type: Boolean,
      default: false
    },
    answer: {
      type: String,
      trim: true,
      lowercase: true,
      required: true
    },
    weightage: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Question', QuestionSchema);
