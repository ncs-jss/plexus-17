const Event = require('mongoose').model('Event');
const _isString = require('lodash/isString');

const mapPresetToFields = ({ preset, fields = '' }) => {
  const presetMap = {
    profile: 'name,username,email,authId,avatar',
    imp: 'name,email,token,username,verified,flag,type,role',
    short: '-__v,-updatedAt,-createdAt,-flag,-verified,-_arena,-token'
  };
  return (preset ? presetMap[preset] : fields).split(',');
};

const getPopulations = include => {
  const allowedIncludes = ['_questions'];
  if (_isString(include)) {
    include = [include];
  }
  include = include.filter(includedField => allowedIncludes.includes(includedField));
  return include.map(includedField => ({ path: includedField }));
};

module.exports = {
  list: async ({ limit = 10, skip = 0, preset, fields, include = [] }) => {
    const options = {};
    options.limit = parseInt(limit);
    options.skip = parseInt(skip);

    fields = mapPresetToFields({ preset, fields });
    const populations = getPopulations(include);

    return Event.find({}, fields, options).populate(populations);
  },
  get: async (id, options) => {
    fields = mapPresetToFields(options);
    const { query_field = '_id' } = options;
    const query = {};
    query[query_field] = id;
    return Event.findOne(query, fields);
  },
  create: async (data, options = {}) => {
    fields = mapPresetToFields(options);
    const existingEvent = await Event.findOne(
      {
        name: data.name
      },
      fields
    );
    if (existingEvent) {
      return existingEvent;
    }
    return new Event(data).save();
  },
  update: async (id, data, options = {}) => {
    //todo
    options.fields = mapPresetToFields(options);
    options.new = true;
    return Event.findByIdAndUpdate(id, { $set: data }, options);
  },
  remove: async (id, options = {}) => {
    //todo
    options.select = mapPresetToFields(options);
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
