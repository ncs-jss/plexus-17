const Question = require('mongoose').model('Question');

const EventService = require('./event.service.js');

const getPopulations = ({ include = [], fields = {} }) => {
  const allowedIncludes = ['_event'];
  include = allowedIncludes.filter(allowedField => include.includes(allowedField)); //to check valid include
  return include.map(includedField => ({ path: includedField, select: fields[includedField] }));
};

const list = async ({ limit = 10, skip = 0, fields = {}, include = [] }) => {
  const options = {};
  options.limit = parseInt(limit);
  options.skip = parseInt(skip);

  const populations = getPopulations({ include, fields });
  return Question.find({}, fields.self, options).populate(populations);
};

const get = async (id, { query_field = '_id', fields = {}, include = [] }) => {
  const query = {};
  query[query_field] = id;

  const populations = getPopulations({ include, fields });
  return Question.findOne(query, fields.self).populate(populations);
};

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
