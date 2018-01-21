const { Joi } = require('express-joi');

const { list: userListHandler, get: userGetHandler } = require('./handlers/api.handler')('users');

module.exports = test => {
  test('GET /users', assert => {
    userListHandler().end((err, { body: userList }) => {
      assert.notEqual(userList, [], "List of users shouldn't be empty");
      assert.end();
    });
  });

  test('GET /users/:id', assert => {
    assert.plan(6);
    userListHandler().end((err, { body: [user] }) => {
      //user holds the first user document in the userList array
      userGetHandler(user._id).end((err, { body: userGet }) => {
        assert.comment("Using user's id");
        assert.deepEquals(userGet, user, 'userGet must match the one from user list');
      });
      userGetHandler(user.username, {
        query_field: 'username'
      }).end((err, { body: userGet }) => {
        assert.comment("Using user's username");
        assert.deepEquals(userGet, user, 'userGet must match the one from user list using username');
      });

      const presetMap = {
        profile: ['_id', 'name', 'username', 'email', 'authId', 'avatar'],
        imp: ['_id', 'name', 'email', 'token', 'username', 'verified', 'flag', 'type', 'role'],
        short: ['_id', 'authId', 'avatar', 'email', 'name', 'role', 'type', 'username']
      };
      Object.entries(presetMap).map(([preset, keys]) => {
        userGetHandler(user._id, {
          preset
        }).end((err, { body: userGet }) => {
          assert.deepEquals(
            Object.keys(userGet).sort(),
            keys.sort(),
            `userGet with preset ${preset} must have only these keys`
          );
        });
      });
      userGetHandler(user._id, {
        fields: 'name'
      }).end((err, { body: userGet }) => {
        const error = Joi.validate(
          userGet,
          Joi.object({
            _id: Joi.types.string().required(),
            name: Joi.types.string().required()
          })
        );
        assert.equals(error, null);
      });
    });
  });
};
