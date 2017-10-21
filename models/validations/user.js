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
    id: Joi.types.String().required()
  },
  delete: {
    id: Joi.types.String().required()
  }
};
