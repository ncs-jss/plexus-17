const { joiValidate } = require('express-joi');

const User = require('../models/User');
const userValidator = require('../models/validations/user');
const { isLogin, isAdmin, isManager } = require('../middlewares/roleManager.mw');


module.exports = app => {

  // User Routes
  app.use(isLogin)
    app.get('/api/users/:id', joiValidate(userValidator.get), async (req, res) => {
      let { id } = req.items;
      const user = await User.findById(id);
      if (user.role === 'admin' && req.user.role !== 'admin') {
        return res.status(403).send({
          error: 'Access to admin details not allowed'
        });
      }
      res.send(user);
    });

    app.put('/api/users/:id', joiValidate(userValidator.update), async (req, res) => {
      let { id } = req.items;
      const user = await User.findById(id);
      if (user.role === req.user.role) {
        user.updateUser(user, req);
        return res.send(user);
      }
      res.status(403).send({
        error: 'update other users details is not allowed'
      });
    });


  app.get('/api/user/:id', isManager, joiValidate(userValidator.get), async (req, res) => {
    let { id } = req.items;
    const user = await User.findById(id);
    if (user.role === 'admin' && req.user.role !== 'admin') {
      return res.status(403).send({
        error: 'Access to admin details not allowed'
      });
    }
    res.send(user);
  });


  // Admin Routes
  app.use(isAdmin)
    app.get('/api/users', joiValidate(userValidator.getList), async (req, res) => {
      let { limit, skip, fields } = req.items;
      limit = parseInt(limit);
      skip = parseInt(skip);
      const users = await User.find()
        .limit(limit)
        .skip(skip);
      res.send(users);
    });

};
