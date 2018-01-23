const Joi = require('joi');

const { limit, skip, id } = require('./common.joi');

const fields = Joi.object().keys({
  self: Joi.array()
    .items(Joi.string())
    .single(),
  _questions: Joi.array()
    .items(Joi.string().invalid('answer'))
    .single()
});

const include = Joi.array()
  .items(Joi.string().valid('_questions'))
  .single();

const list = (() => {
  const base = {
    limit,
    skip,
    fields,
    include
  };
  return {
    public: Joi.object(base),
    user: Joi.object(base),
    admin: Joi.object(base)
  };
})();

const get = (() => {
  const base = {
    id,
    fields,
    include,
    query_field: Joi.string().valid(['_id', 'name'])
  };
  return {
    public: Joi.object(base),
    user: Joi.object(base),
    admin: Joi.object(base)
  };
})();

const create = (() => {
  const base = {
    name: Joi.string().required(),
    description: Joi.string().required(),
    enquiry: Joi.string().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
    state: Joi.string().valid(['running', 'ended', 'toStart', 'blocked']),
    verified: Joi.boolean(),
    flag: Joi.boolean(),
    fields
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
