const Joi = require('joi');

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
        self: ['name', 'winners'],
        _questions: ['text']
      },
      include: ['_questions']
    }).end((err, { body: eventList }) => {
      const { error } = Joi.validate(
        eventList,
        Joi.array().items(
          Joi.object().keys({
            _id: Joi.string().required(),
            name: Joi.string().required(),
            winners: Joi.array().required(),
            _questions: Joi.array()
              .items(
                Joi.object().keys({
                  _id: Joi.string().required(),
                  text: Joi.string().required()
                })
              )
              .required()
          })
        )
      );
      assert.equals(error, null);
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
      const { error } = Joi.validate(
        eventGet,
        Joi.object().keys({
          _id: Joi.string().required(),
          name: Joi.string().required(),
          winners: Joi.array().required(),
          _questions: Joi.array().required()
        })
      );
      assert.equals(error, null);
      assert.end();
    });
  });
};
