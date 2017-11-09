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
    fields: Joi.types.String().optional()
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
    fields: Joi.types.String().optional()
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
    role: Joi.types
      .String()
      .allow(['admin', 'manager', 'editor', 'user'])
      .optional(),
    verified: Joi.types.boolean().optional()
  })
};

const update = {
  user: Joi.object({
    id: Joi.types.String().required(),
    username: Joi.types.String().optional(),
    phoneNo: Joi.types
      .Number()
      .integer()
      .min(10)
      .max(10)
      .optional()
  }),
  admin: Joi.object({
    id: Joi.types.String().required(),
    username: Joi.types.String().optional(),
    phoneNo: Joi.types
      .Number()
      .integer()
      .min(10)
      .max(10)
      .optional(),
    admNo: Joi.types.String().optional(),
    token: Joi.types.String().optional(),
    societyId: Joi.types.String().optional(),
    arenaId: Joi.types.String().optional(),
    role: Joi.types
      .String()
      .allow(['admin', 'manager', 'editor', 'user'])
      .optional(),
    type: Joi.types
      .String()
      .allow(['individual', 'societyMember', 'societyExec'])
      .optional(),
    verified: Joi.types.boolean().optional(),
    flag: Joi.types.boolean().optional()
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
