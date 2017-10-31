const User = require('../models/User');

module.exports = {
  addUser: async function (service, accessToken, refreshToken, profile, done) {
    const authId = {};
    authId[service] = profile.id;
    const existingUser = await User.findOne({ authId });
    if (existingUser) {
      return done(null, existingUser);
    }
    const user = await User.addUser(service, profile);
    return done(null, user);
  }
}
