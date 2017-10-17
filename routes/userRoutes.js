const {
  joiValidate
} = require('express-joi');

const User = require('../models/User');
const userValidator = require('../models/validations/user');
const requireLogin = require('../middlewares/requireLogin');
const requireAdminLogin = require('../middlewares/requireAdminLogin');

module.exports = (app) => {
  app.get('/api/users', requireAdminLogin, joiValidate(userValidator.getList), async (req, res) => {
    let { limit, skip, fields } = req.items;
    limit = parseInt(limit);
    skip = parseInt(skip);
    const users = await User.find().limit(limit).skip(skip);
    res.send(users);
  });
  app.get('/api/users/:id', requireLogin, joiValidate(userValidator.get), async (req, res) => {
    let { id } = req.items;
    const user = await User.findById(id);
    if(user.role === 'admin' && req.user.role !== 'admin'){
      return res.status(403).send({
        error: 'Access to admin details not allowed'
      })
    }
    res.send(user);
  });
}
