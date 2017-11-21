const { isValid } = require('mongoose').Types.ObjectId;

const isValidId = (req, res, next) => {
  const { id } = req.params;
  const { query_field = '_id' } = req.query;
  if (query_field !== '_id' || isValid(id)) {
    return next();
  }
  return res.status(400).send({
    error: `id ${id} is invalid!`
  });
};

module.exports = isValidId;
