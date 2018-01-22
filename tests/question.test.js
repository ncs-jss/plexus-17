const Joi = require('joi');

const { list: questionListHandler, get: questionGetHandler } = require('./handlers/api.handler')('questions');

module.exports = test => {
  test('GET /questions', assert => {
    questionListHandler().end((err, { body: questionList }) => {
      assert.notEqual(questionList, [], "List of questions shouldn't be empty");
    });

    questionListHandler({
      limit: 2,
      skip: 0,
      fields: {
        self: ['text'],
        _event: ['flag']
      },
      include: ['_event']
    }).end((err, { body: questionList }) => {
      const { error } = Joi.validate(
        questionList,
        Joi.array().items(
          Joi.object({
            _id: Joi.string().required(),
            text: Joi.string().required(),
            _event: Joi.object().required()
          })
        )
      );
      assert.equals(error, null);
      assert.end();
    });
  });
};
