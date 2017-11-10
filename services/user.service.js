const User = require('../models/User');
const Messages = require('./lang/Messages.js');

const mapPresetToFields = ({ preset, fields = '' }) => {
  const presetMap = {
    profile: 'name,username,email,authId,avatar',
    imp: 'name,email,token,username,verified,flag,type,role',
    short: '-updatedAt,-createdAt,-flag,-verified,-_arena,-token'
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
    return User.findById(id, fields);
  },
  create: async data => {
    const existingUser = await User.findOne({
      authId: data.authId
    });
    if (existingUser) {
      return existingUser;
    }
    return new User(data).save();
  },
  update: async (
    id,
    data,
    options = {
      new: true
    }
  ) => {
    return User.findByIdAndUpdate(id, { $set: data }, options);
  },
  remove: async id => {
    return User.findByIdAndRemove(id);
  }
};
