const Question = require('mongoose').model('Question');

const EventService = require('./event.service.js');

const list = async () => {
  return Question.find({});
};

const get = async () => {};

const create = async (data, options = {}) => {
  const question = await new Question(data).save();
  const eventId = data._event;
  const questionId = question._id;
  await EventService.addQuestion({ eventId, questionId });
  return question;
};

const update = async () => {};

const remove = async () => {};

module.exports = {
  list,
  get,
  create,
  update,
  remove
};
