const { Joi } = require('express-joi');

module.exports = {
  getList: {
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
  },
  get: {
    id: Joi.types.String().required()
  },
  create: {},
  update: {
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
    role: Joi.types.String().optional(),
    type: Joi.types.String().optional(),
    societyId: Joi.types.String().optional(),
    arenaId: Joi.types.String().optional(),
    verified: Joi.types.String().optional(),
    flag: Joi.types.String().optional()
  },
  delete: {
    id: Joi.types.String().required()
  }
};
