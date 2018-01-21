const { Joi } = require('express-joi');

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
      questionList.reduce((acc, question) => {
        const error = Joi.validate(
          question,
          Joi.object({
            _id: Joi.types.string().required(),
            text: Joi.types.string().required(),
            _event: Joi.types.object().required()
          })
        );
        assert.equals(error, null);
      });
      assert.end();
    });
  });
};
