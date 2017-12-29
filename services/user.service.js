const User = require('mongoose').model('User');

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
    return User.find({}, fields, options);
  },
  get: async (id, options) => {
    fields = mapPresetToFields(options);
    const { query_field = '_id' } = options;
    const query = {};
    query[query_field] = id;
    return User.findOne(query, fields);
  },
  create: async (data, options = {}) => {
    fields = mapPresetToFields(options);
    const existingUser = await User.findOne(
      {
        authId: data.authId
      },
      fields
    );
    if (existingUser) {
      return existingUser;
    }
    return new User(data).save();
  },
  update: async (id, data, options = {}) => {
    options.fields = mapPresetToFields(options);
    options.new = true;
    return User.findByIdAndUpdate(id, { $set: data }, options);
  },
  remove: async (id, options = {}) => {
    options.select = mapPresetToFields(options);
    return User.findByIdAndRemove(id, options);
  }
};
