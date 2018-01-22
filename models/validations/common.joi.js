const Joi = require('joi');

module.exports = {
  limit: Joi.number()
    .integer()
    .min(1)
    .max(25)
    .required(),
  skip: Joi.number()
    .integer()
    .min(0)
    .max(25)
    .required(),
  id: Joi.string().required(),
  query_field: Joi.string().valid(['_id', 'username']),
  fields: Joi.any(),
  include: Joi.any()
};
