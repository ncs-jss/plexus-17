module.exports = {
  baseUrl: '/api',
  request: require('supertest')(process.env.HOST_URL),
  cookies: {
    admin: process.env.testAdminCookie,
    user: process.env.testUserCookie
  }
};
