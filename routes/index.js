module.exports = app => {
  require('./auth.route')(app);
  require('./user.route')(app);
};
