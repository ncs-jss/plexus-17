const Joi = require('joi');

const { limit, skip, id } = require('./common.joi');

const query_field = Joi.string().valid(['_id', 'username']);

const preset = Joi.string().valid(['profile', 'imp', 'short']);

const field = Joi.array()
  .items(Joi.string())
  .single();

const fields = Joi.object().keys({
  self: field,
  _society: field,
  _arena: field
});

// const fields = Joi.string();

const list = (() => {
  const base = Joi.object()
    .keys({
      limit,
      skip,
      fields,
      preset
    })
    .without('preset', 'fields');
  return {
    user: base,
    admin: base
  };
})();

const get = (() => {
  const base = Joi.object()
    .keys({
      id,
      query_field,
      fields,
      preset
    })
    .without('preset', 'fields');
  return {
    user: base,
    admin: base
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
    admin: Joi.object()
      .keys(base)
      .without('preset', 'fields')
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
    user: Joi.object(base).without('preset', 'fields'),
    admin: Joi.object(Object.assign(base, adminOnly)).without('preset', 'fields')
  };
})();

const remove = (() => {
  const base = {
    id,
    fields,
    preset
  };
  return {
    admin: Joi.object(base).without('preset', 'fields')
  };
})();

module.exports = {
  list,
  get,
  create,
  update,
  remove
};
