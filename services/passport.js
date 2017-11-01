const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');

const config = require('../config');
const User = require('../models/User');
const { addUser } = require('./user.service.js');

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
    (...args) => addUser('google', ...args)
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
    (...args) => addUser('facebook', ...args)
  )
);
