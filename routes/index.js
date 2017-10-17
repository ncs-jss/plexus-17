
module.exports = (app) => {
  require('./authRoutes')(app);
  require('./userRoutes')(app);
}
