const Question = require('mongoose').model('Question');

const EventService = require('./event.service.js');

const mapPresetToProj = ({ preset, fields }) => {
  const presetMap = {
    short: ['text', 'type', 'options']
  };

  return presetMap[preset] || fields.self;
};

const getPopulations = ({ include = [], fields = {} }) => {
  const allowedIncludes = ['_event'];
  include = allowedIncludes.filter(allowedField => include.includes(allowedField)); //to check valid include
  return include.map(includedField => ({ path: includedField, select: fields[includedField] }));
};

const list = async ({ limit = 10, skip = 0, fields = {}, include = [], lean = false, preset = '' }) => {
  const options = {
    limit,
    skip,
    lean
  };

  const projections = mapPresetToProj({ preset, fields });
  const populations = getPopulations({ include, fields });
  return Question.find({}, projections, options).populate(populations);
};

const get = async (id, { query_field = '_id', fields = {}, include = [], lean = false }) => {
  const options = {
    lean
  };

  const query = {};
  query[query_field] = id;

  const projections = mapPresetToProj({ preset, fields });
  const populations = getPopulations({ include, fields });
  return Question.findOne(query, projections, options).populate(populations);
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
