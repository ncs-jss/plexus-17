const Joi = require('joi');

const joiValidator = schema => (req, res, next) => {
  if (!schema) {
    return;
  }
  const role = req.user ? req.user.role : 'public';
  const schemaForRole = schema[role];

  const data = { ...req.query, ...req.params };

  const { error, value } = Joi.validate(data, schemaForRole);
  if (error) {
    return res.status(400).send({
      error: error.details[0].message
    });
  }
  req.items = value;
  return next();
};

module.exports = joiValidator;
