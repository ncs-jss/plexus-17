const passport = require('passport');

module.exports = app => {

  app.get('/api/me', (req, res) => {
    res.send(req.user);
  });


  // Google Login
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/dashboard');
  });

  // Facebook Login
  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', { scope: ['email', 'user_about_me', 'user_photos'] })
  );

  app.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/dashboard');
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

};
