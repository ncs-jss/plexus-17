const { Joi } = require('express-joi');

const { list: eventListHandler, get: eventGetHandler } = require('./handlers/api.handler')('events');

module.exports = test => {
  test('GET /events', assert => {
    eventListHandler().end((err, { body: eventList }) => {
      assert.notEqual(eventList, [], "List of events shouldn't be empty");
    });

    eventListHandler({
      limit: 2,
      skip: 0,
      fields: {
        self: ['name', 'winners']
      }
    }).end((err, { body: eventList }) => {
      eventList.reduce((acc, event) => {
        const error = Joi.validate(
          event,
          Joi.object({
            _id: Joi.types.string().required(),
            name: Joi.types.string().required(),
            winners: Joi.types.array().required()
          })
        );
        assert.equals(error, null);
      });
      assert.end();
    });
  });

  test('GET /events/:id', assert => {
    eventGetHandler('5a17313e5134450a38febcbe', {
      fields: {
        self: ['name', 'winners']
      },
      include: ['_questions']
    }).end((err, { body: eventGet }) => {
      const error = Joi.validate(
        eventGet,
        Joi.object({
          _id: Joi.types.string().required(),
          name: Joi.types.string().required(),
          winners: Joi.types.array().required(),
          _questions: Joi.types.array().required()
        })
      );
      assert.equals(error, null);
      assert.end();
    });
  });
};
