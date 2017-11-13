const test = require('tape');
const request = require('supertest')('http://localhost:5000');

const cookies = {
  admin: process.env.testAdminCookie,
  user: process.env.testUserCookie
};

test('GET /users', assert => {
  request
    .get('/api/users')
    .query({
      limit: 10,
      skip: 0
    })
    .set('Cookie', cookies.admin)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      assert.notEqual(res.body, [], "List of users shouldn't be empty");
      assert.end();
    });
});
