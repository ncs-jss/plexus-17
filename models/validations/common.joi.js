const { Joi } = require('express-joi');

module.exports = {
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
  id: Joi.types.String().required(),
  query_field: Joi.types.String().valid(['_id', 'username']),
  fields: Joi.types.any(),
  include: Joi.types.any()
};
