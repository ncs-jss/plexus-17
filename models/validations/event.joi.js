const Joi = require('joi');

const { limit, skip, id } = require('./common.joi');

const preset = Joi.string().valid('short');

const fields = Joi.object().keys({
  self: Joi.array()
    .items(Joi.string())
    .single(),
  _questions: Joi.array()
    .items(
      Joi.string()
        .alphanum()
        .invalid('answer')
    ) //alphanum prevents +answer
    .single()
});

const include = Joi.array()
  .items(Joi.string().valid('_questions'))
  .single();

const list = (() => {
  const base = Joi.object()
    .keys({
      limit,
      skip,
      fields,
      include,
      preset
    })
    .without('preset', 'fields');
  return {
    public: base,
    user: base,
    admin: base
  };
})();

const get = (() => {
  const base = Joi.object()
    .keys({
      id,
      fields,
      include,
      preset,
      query_field: Joi.string().valid(['_id', 'name'])
    })
    .without('preset', 'fields');
  return {
    public: base,
    user: base,
    admin: base
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
