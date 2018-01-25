const User = require('mongoose').model('User');

const mapPresetToProj = require('../utilities/mapPresetToProj.util')({
  presetMap: {
    profile: ['name', 'username', 'email', 'authId', 'avatar'],
    imp: ['name', 'email', 'token', 'username', 'verified', 'flag', 'type', 'role'],
    short: ['-__v', '-updatedAt', '-createdAt', '-flag', '-verified', '-_arena', '-token']
  }
});

const list = async ({ limit = 10, skip = 0, fields = {}, preset = '' } = {}) => {
  const options = {
    limit,
    skip
  };

  const projections = mapPresetToProj({ preset, fields });
  return User.find({}, projections, options);
};

const get = async (id, { query_field = '_id', fields = {}, preset = '' } = {}) => {
  const query = {};
  query[query_field] = id;

  const projections = mapPresetToProj({ preset, fields });
  return User.findOne(query, projections);
};

const create = async (data, { fields = {} } = {}) => {
  const projections = mapPresetToProj({ fields });
  const existingUser = await User.findOne(
    {
      authId: data.authId
    },
    projections
  );
  if (existingUser) {
    return existingUser;
  }
  return new User(data).save();
};

module.exports = {
  list,
  get,
  create,
  update: async (id, data, { fields = {}, preset = '' } = {}) => {
    const projections = mapPresetToProj({ preset, fields });
    const options = {
      fields: projections,
      new: true
    };
    return User.findByIdAndUpdate(id, { $set: data }, options);
  },
  remove: async (id, { fields = {}, preset = '' } = {}) => {
    const options = {
      select: mapPresetToProj({ preset, fields })
    };
    return User.findByIdAndRemove(id, options);
  }
};
