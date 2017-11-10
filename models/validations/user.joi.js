const { Joi } = require('express-joi');

const list = {
  user: Joi.object({
    limit: Joi.types
      .Number()
      .integer()
      .min(1)
      .max(25)
      .required(),
    skip: Joi.types
      .Number()
      .integer()
      .min(0)
      .max(25)
      .required(),
    fields: Joi.types.String()
  }),
  admin: Joi.object({
    limit: Joi.types
      .Number()
      .integer()
      .min(1)
      .max(25)
      .required(),
    skip: Joi.types
      .Number()
      .integer()
      .min(0)
      .max(25)
      .required(),
    fields: Joi.types.String(),
    preset: Joi.types.String().valid(['profile', 'imp', 'full', 'short'])
  })
};

const get = {
  user: Joi.object({
    id: Joi.types.String().required()
  }),
  admin: Joi.object({
    id: Joi.types.String().required()
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
    id: Joi.types.String().required(),
    username: Joi.types.String(),
    phoneNo: Joi.types
      .Number()
      .integer()
      .min(10)
      .max(10)
  }),
  admin: Joi.object({
    id: Joi.types.String().required(),
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
    id: Joi.types.String().required()
  })
};

module.exports = {
  list,
  get,
  update,
  create,
  remove
};
