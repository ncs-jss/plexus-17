const Event = require('mongoose').model('Event');

const getPopulations = ({ include, fields = {} }) => {
  const allowedIncludes = ['_questions'];
  include = allowedIncludes.filter(allowedField => include.includes(allowedField)); //to check valid include
  return include.map(includedField => ({ path: includedField, select: fields[includedField] }));
};

module.exports = {
  list: async ({ limit = 10, skip = 0, fields = {}, include = [] }) => {
    const options = {};
    options.limit = parseInt(limit);
    options.skip = parseInt(skip);

    const populations = getPopulations({ include, fields });
    return Event.find({}, fields.self, options).populate(populations);
  },
  get: async (id, { query_field = '_id', fields = {}, include = [] }) => {
    const query = {};
    query[query_field] = id;

    const populations = getPopulations({ include, fields });
    return Event.findOne(query, fields.self).populate(populations);
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
