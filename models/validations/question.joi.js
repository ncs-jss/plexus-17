const { Joi } = require('express-joi');

const { limit, skip, id } = require('./common.joi');

const fields = Joi.types.String();

const list = (() => {
  const base = {
    limit,
    skip,
    fields
  };
  return {
    public: Joi.object(base),
    user: Joi.object(base),
    admin: Joi.object(base)
  };
})();

const get = (() => {
  const base = {
    id
  };
  return {
    public: Joi.object(base),
    user: Joi.object(base),
    admin: Joi.object(base)
  };
})();

const create = (() => {
  const base = {
    text: Joi.types.String().required(),
    answer: Joi.types.String().required(),
    type: Joi.types
      .String()
      .valid(['shortAns', 'para', 'options', 'file'])
      .required(),
    options: Joi.types.array().min(1),
    media: Joi.object({
      type: Joi.string(),
      url: Joi.string().required()
    }),
    flag: Joi.types.boolean(),
    weightage: Joi.types.number().required(),
    _event: Joi.types.String().required()
  };
  return {
    admin: Joi.object(base)
  };
})();

module.exports = {
  list,
  get,
  create,
  update: {
    user: Joi.object({}),
    admin: Joi.object({})
  },
  remove: {
    user: Joi.object({}),
    admin: Joi.object({})
  }
};
