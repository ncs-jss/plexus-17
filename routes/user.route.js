const router = require('express').Router();
const { joiValidate } = require('express-joi');

const User = require('../models/User');
const userJoi = require('../models/validations/user.joi');
const { isLogin, isAdmin, isAdminOrSelf } = require('../middlewares/roleManager.mw');
const UserService = require('../services/user.service');

const userValidator = (method, req, res, next) => (req, res, next) => {
  return joiValidate(userJoi[method][req.user.role])(req, res, next);
};

// User Routes
router
  .use('/:id', isLogin)
  .route('/:id')
  .get(userValidator('get'), isAdminOrSelf, async (req, res) => {
    let { id } = req.items;
    const user = await UserService.get(id, req.query);
    res.send(user);
  })
  .put(userValidator('update'), isAdminOrSelf, async (req, res) => {
    const user = await UserService.update(req.items.id, req.body);
    return res.send(user);
  })
  .delete(userValidator('remove'), isAdmin, async (req, res) => {
    const user = await UserService.remove(req.items.id);
    return res.send(user);
  });

// Admin Routes
router
  .use('/', isLogin, isAdmin)
  .route('/')
  .get(userValidator('list'), async (req, res) => {
    const users = await UserService.list(req.items);
    res.send(users);
  })
  .post(userValidator('create'), async (req, res) => {
    const user = await UserService.create(req.body);
    res.send(user);
  });

module.exports = router;
