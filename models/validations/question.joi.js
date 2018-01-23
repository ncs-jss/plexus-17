const Joi = require('joi');

const { limit, skip, id } = require('./common.joi');

const fields = Joi.object().keys({
  self: Joi.array()
    .items(
      Joi.string()
        .alphanum()
        .invalid('answer')
    ) //alphanum prevents +answer
    .single(),
  _event: Joi.array()
    .items(Joi.string().invalid('_question'))
    .single()
});

const include = Joi.array()
  .items(Joi.string().valid('_event'))
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
    include
  };
  return {
    public: Joi.object(base),
    user: Joi.object(base),
    admin: Joi.object(base)
  };
})();

const create = (() => {
  const base = {
    text: Joi.string().required(),
    answer: Joi.string().required(),
    type: Joi.string()
      .valid(['shortAns', 'para', 'options', 'file'])
      .required(),
    options: Joi.array().min(1),
    media: Joi.object({
      type: Joi.string(),
      url: Joi.string().required()
    }),
    flag: Joi.boolean(),
    weightage: Joi.number().required(),
    _event: Joi.string().required()
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
