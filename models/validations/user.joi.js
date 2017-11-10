const { Joi } = require('express-joi');
const { limit, skip, id } = require('./common.joi');

const list = {
  user: Joi.object({
    limit,
    skip,
    fields: Joi.types.String(),
    preset: Joi.types.String().valid(['profile', 'imp', 'short'])
  }),
  admin: Joi.object({
    limit,
    skip,
    fields: Joi.types.String(),
    preset: Joi.types.String().valid(['profile', 'imp', 'short'])
  })
};

const get = {
  user: Joi.object({
    id,
    fields: Joi.types.String(),
    preset: Joi.types.String().valid(['profile', 'imp', 'short'])
  }),
  admin: Joi.object({
    id,
    fields: Joi.types.String(),
    preset: Joi.types.String().valid(['profile', 'imp', 'short'])
  })
};

const create = {
  admin: Joi.object({
    name: Joi.types.String().required(),
    email: Joi.types
      .String()
      .email()
      .required(),
    role: Joi.types.String().valid(['admin', 'manager', 'editor', 'user']),
    verified: Joi.types.boolean()
  })
};

const update = {
  user: Joi.object({
    id,
    username: Joi.types.String(),
    phoneNo: Joi.types
      .Number()
      .integer()
      .min(10)
      .max(10)
  }),
  admin: Joi.object({
    id,
    username: Joi.types.String(),
    phoneNo: Joi.types
      .Number()
      .integer()
      .min(10)
      .max(10),
    admNo: Joi.types.String(),
    token: Joi.types.String(),
    societyId: Joi.types.String(),
    arenaId: Joi.types.String(),
    role: Joi.types.String().valid(['admin', 'manager', 'editor', 'user']),
    type: Joi.types.String().valid(['individual', 'societyMember', 'societyExec']),
    verified: Joi.types.boolean(),
    flag: Joi.types.boolean()
  })
};

const remove = {
  admin: Joi.object({
    id
  })
};

module.exports = {
  list,
  get,
  create,
  update,
  remove
};
