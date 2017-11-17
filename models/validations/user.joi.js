const { Joi } = require('express-joi');
const { limit, skip, id, query_field } = require('./common.joi');

const preset = Joi.types.String().valid(['profile', 'imp', 'short']);
const fields = Joi.types.String();

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
    name: Joi.types.String().required(),
    email: Joi.types
      .String()
      .email()
      .required(),
    role: Joi.types.String().valid(['admin', 'manager', 'editor', 'user']),
    verified: Joi.types.boolean(),
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
    username: Joi.types.String(),
    phoneNo: Joi.types
      .Number()
      .integer()
      .min(10)
      .max(10),
    fields,
    preset
  };
  const adminOnly = {
    admNo: Joi.types.String(),
    token: Joi.types.String(),
    societyId: Joi.types.String(),
    arenaId: Joi.types.String(),
    role: Joi.types.String().valid(['admin', 'manager', 'editor', 'user']),
    type: Joi.types.String().valid(['individual', 'societyMember', 'societyExec']),
    verified: Joi.types.boolean(),
    flag: Joi.types.boolean()
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
