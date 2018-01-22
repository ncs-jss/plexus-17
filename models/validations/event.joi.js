const Joi = require('joi');

const { limit, skip, id, fields, include } = require('./common.joi');

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
    query_field: Joi.string()
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
