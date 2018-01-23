const Question = require('mongoose').model('Question');

const EventService = require('./event.service.js');
const mapPresetToProj = require('../utilities/mapPresetToProj.util')({
  presetMap: {
    short: ['text', 'type', 'options']
  }
});
const getPopulations = require('../utilities/getPopulations.util')({
  allowedIncludes: ['_event']
});

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
