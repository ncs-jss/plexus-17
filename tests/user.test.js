const test = require('tape');

const userHandler = require('./handlers/user.handler');

test('GET /users', assert => {
  userHandler.list().end((err, { body: userList }) => {
    assert.notEqual(userList, [], "List of users shouldn't be empty");
    assert.end();
  });
});

test('GET /users/:id', assert => {
  userHandler.list().end((err, { body: [user] }) => {
    //user holds the first user document in the userList array
    userHandler.get(user._id).end((err, { body: userGet }) => {
      assert.notEqual(userGet, user, 'Get user must match the one from user list');
      assert.end();
    });
  });
});
