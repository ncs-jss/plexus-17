const Joi = require('joi');

const { limit, skip, id, query_field } = require('./common.joi');

const preset = Joi.string().valid(['profile', 'imp', 'short']);
const fields = Joi.string();

const list = (() => {
  const base = {
    limit,
    skip,
    fields,
    preset
  };
  return {
    user: Joi.object(base),
    admin: Joi.object(base)
  };
})();

const get = (() => {
  const base = {
    id,
    query_field,
    fields,
    preset
  };
  return {
    user: Joi.object(base),
    admin: Joi.object(base)
  };
})();

const create = (() => {
  const base = {
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    role: Joi.string().valid(['admin', 'manager', 'editor', 'user']),
    verified: Joi.boolean(),
    fields,
    preset
  };
  return {
    admin: Joi.object(base)
  };
})();

const update = (() => {
  const base = {
    id,
    username: Joi.string(),
    phoneNo: Joi.number()
      .integer()
      .min(10)
      .max(10),
    fields,
    preset
  };
  const adminOnly = {
    admNo: Joi.string(),
    token: Joi.string(),
    societyId: Joi.string(),
    arenaId: Joi.string(),
    role: Joi.string().valid(['admin', 'manager', 'editor', 'user']),
    type: Joi.string().valid(['individual', 'societyMember', 'societyExec']),
    verified: Joi.boolean(),
    flag: Joi.boolean()
  };
  return {
    user: Joi.object(base),
    admin: Joi.object(Object.assign(base, adminOnly))
  };
})();

const remove = (() => {
  const base = {
    id,
    fields,
    preset
  };
  return {
    admin: Joi.object(base)
  };
})();

module.exports = {
  list,
  get,
  create,
  update,
  remove
};
