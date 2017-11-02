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
    name: Joi.types.String().optional(),
    email: Joi.types.String().required(),
    username: Joi.types.String().allow('').allow(null),
    phoneNo: Joi.types.String().allow('').allow(null),
    admNo: Joi.types.String().allow('').allow(null)
  },
  delete: {
    id: Joi.types.String().required()
  }
};
