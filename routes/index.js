module.exports = app => {
  app.use('/', require('./auth.route'));
  app.use('/api/users', require('./user.route'));
};
