const Event = require('mongoose').model('Event');

const mapPresetToFields = ({ preset, fields = '' }) => {
  const presetMap = {
    profile: 'name,username,email,authId,avatar',
    imp: 'name,email,token,username,verified,flag,type,role',
    short: '-__v,-updatedAt,-createdAt,-flag,-verified,-_arena,-token'
  };
  return (preset ? presetMap[preset] : fields).split(',');
};

module.exports = {
  list: async (
    options = {
      limit: 10,
      skip: 0
    }
  ) => {
    options.limit = parseInt(options.limit);
    options.skip = parseInt(options.skip);
    fields = mapPresetToFields(options);
    return Event.find({}, fields, options);
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
  }
};
