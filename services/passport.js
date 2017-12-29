const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const config = require('../config');
const User = require('mongoose').model('User');
const UserService = require('./user.service');

const createUser = async (service, accessToken, refreshToken, profile, done) => {
  const authId = {};
  authId[service] = profile.id;
  const userData = {
    authId,
    name: profile.displayName,
    email: profile.emails[0].value,
    avatar: {
      url: profile.photos[0].value
    }
  };
  try {
    const user = await UserService.create(userData);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Google
passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleClientID,
      clientSecret: config.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (...args) => createUser('google', ...args)
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebookAppId,
      clientSecret: config.facebookAppSecret,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'name', 'picture.type(large)', 'emails', 'displayName', 'about', 'gender'],
      proxy: true
    },
    (...args) => createUser('facebook', ...args)
  )
);
