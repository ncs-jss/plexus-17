const User = require('../models/User');

module.exports = {
  create: async function(userData) {
    const existingUser = await User.findOne({
      authId: userData.authId
    });
    if (existingUser) {
      return existingUser;
    }
    return new User(userData).save();
  }
};
