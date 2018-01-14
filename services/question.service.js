const Question = require('mongoose').model('Question');

const list = async () => {
  return Question.find({});
};

const get = async () => {};

const create = async (data, options = {}) => {
  return new Question(data).save();
};

const update = async () => {};

const remove = async () => {};

module.exports = {
  list,
  get,
  create,
  update,
  remove
};
