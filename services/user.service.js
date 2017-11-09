const User = require('../models/User');

module.exports = {
  addUser: async function(service, accessToken, refreshToken, profile, done) {
    const authId = {};
    authId[service] = profile.id;
    const existingUser = await User.findOne({
      authId
    });
    if (existingUser) {
      return done(null, existingUser);
    }
    const user = await new User({
      authId,
      name: profile.displayName,
      email: profile.emails[0].value,
      avatar: {
        url: profile.photos[0].value
      }
    }).save();
    return done(null, user);
  }
};
