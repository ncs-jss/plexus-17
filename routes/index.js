module.exports = app => {
  app.use('/', require('./auth.route'));
  app.use('/api/users', require('./user.route'));
  app.use('/api/events', require('./event.route'));
  app.use('/api/questions', require('./question.route'));
  app.use('/api/arenas', require('./arena.route'));
};
