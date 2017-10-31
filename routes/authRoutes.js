const passport = require('passport');

module.exports = app => {

  app.get('/api/me', (req, res) => {
    res.send(req.user);
  });

  app.get('/auth/:service', (req, res, next) => {

    switch (req.params.service) {
    case 'google':
      passport.authenticate('google', {
        scope: ['profile', 'email']
      })(req, res, next);
      break;
    case 'facebook':
      passport.authenticate('facebook', {
        scope: ['email', 'user_about_me', 'user_photos']
      })(req, res, next);
      break;
    default:
      next();
    }
  });


  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/dashboard');
  });


  app.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/dashboard');
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

};
