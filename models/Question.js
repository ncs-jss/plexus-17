const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema;

const MediaSchema = require('./schema/Media');

const QuestionSchema = new Schema(
  {
    text: {
      type: String,
      trim: true,
      required: true
    },
    _event: {
      type: ObjectId,
      ref: 'Event'
    },
    media: MediaSchema,
    type: {
      type: String,
      enum: ['shortAns', 'para', 'options', 'file'],
      default: 'shortAns'
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
      select: false,
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
