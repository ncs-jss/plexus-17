const Event = require('mongoose').model('Event');

const mapPresetToProj = require('../utilities/mapPresetToProj.util')({
  presetMap: {
    short: ['name', 'description', 'state']
  }
});
const getPopulations = require('../utilities/getPopulations.util')({
  allowedIncludes: ['_questions']
});

module.exports = {
  list: async ({ limit = 10, skip = 0, fields = {}, include = [], preset = '' }) => {
    const options = {
      limit,
      skip
    };

    const projections = mapPresetToProj({ preset, fields });
    const populations = getPopulations({ include, fields });
    return Event.find({}, projections, options).populate(populations);
  },
  get: async (id, { query_field = '_id', fields = {}, include = [], preset = '' }) => {
    const query = {};
    query[query_field] = id;

    const projections = mapPresetToProj({ preset, fields });
    const populations = getPopulations({ include, fields });
    return Event.findOne(query, projections).populate(populations);
  },
  create: async (data, { fields = {} }) => {
    const existingEvent = await Event.findOne(
      {
        name: data.name
      },
      fields.self
    );
    if (existingEvent) {
      return existingEvent;
    }
    return new Event(data).save();
  },
  update: async (id, data, { fields = {} }) => {
    //todo
    const options = {};
    options.fields = fields.self;
    options.new = true;
    return Event.findByIdAndUpdate(id, { $set: data }, options);
  },
  remove: async (id, { fields = {} }) => {
    //todo
    const options = {};
    options.select = fields.self;
    return Event.findByIdAndRemove(id, options);
  },
  addQuestion: async ({ eventId, questionId }) => {
    return Event.findByIdAndUpdate(eventId, {
      $push: {
        _questions: questionId
      }
    });
  }
};
