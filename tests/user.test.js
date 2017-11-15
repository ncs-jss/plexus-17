const test = require('tape');

const userHandler = require('./handlers/user.handler');

test('GET /users', assert => {
  userHandler.list().end((err, res) => {
    assert.notEqual(res.body, [], "List of users shouldn't be empty");
    assert.end();
  });
});

test('GET /users/:id', assert => {
  userHandler.list().end((err, { body: userListBody }) => {
    const user = userListBody[0];
    userHandler.get(user._id).end((err, { body: userGetBody }) => {
      assert.notEqual(userGetBody, user, 'Get user must match the one from user list');
      assert.end();
    });
  });
});
