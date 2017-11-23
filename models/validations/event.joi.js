const { Joi } = require('express-joi');
const { limit, skip, id } = require('./common.joi');

const list = (() => {
  const base = {
    limit,
    skip
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
    name: Joi.types.String().required(),
    description: Joi.types.String().required(),
    enquiry: Joi.types.String().required(),
    startTime: Joi.types.date().required(),
    endTime: Joi.types.date().required(),
    state: Joi.types.String().valid(['running', 'ended', 'toStart', 'blocked']),
    verified: Joi.types.boolean(),
    flag: Joi.types.boolean()
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
