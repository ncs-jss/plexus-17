const router = require('express').Router();
const passport = require('passport');

router.get('/api/me', (req, res) => {
  res.send(req.user);
});

router.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/auth/:service', (req, res, next) => {
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

router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/dashboard');
});

router.get('/auth/facebook/callback', passport.authenticate('facebook'), (req, res) => {
  res.redirect('/dashboard');
});

module.exports = router;
