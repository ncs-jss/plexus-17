const router = require('express').Router();
const Joi = require('joi');

const userJoi = require('../models/validations/user.joi');
const joiValidator = require('../middlewares/joiValidator.mw');
const { isLogin, isAdmin, isAdminOrSelf, isSelf } = require('../middlewares/roleManager.mw');
const isValidId = require('../middlewares/validId.mw');
const UserService = require('../services/user.service');
const Errors = require('../services/lang/Errors');

const userValidator = method => {
  const userSchema = userJoi[method];
  if (userSchema) {
    return joiValidator(userSchema);
  }
  return res.status(404).send({
    error: `${method} on users not allowed`
  });
};

// User Routes
router
  .use('/:id', isValidId)
  .use('/:id', isLogin)
  .route('/:id')
  .get(userValidator('get'), isAdminOrSelf, async (req, res) => {
    let { id } = req.items;
    try {
      const user = await UserService.get(id, req.query);
      res.send(user);
    } catch (err) {
      return res.status(500).send({
        error: Errors.get
      });
    }
  })
  .put(userValidator('update'), isAdminOrSelf, async (req, res) => {
    try {
      const user = await UserService.update(req.items.id, req.body, req.query);
      return res.send(user);
    } catch (err) {
      return res.status(500).send({
        error: Errors.update
      });
    }
  })
  .delete(userValidator('remove'), isAdmin, async (req, res) => {
    try {
      const user = await UserService.remove(req.items.id, req.query);
      return res.send(user);
    } catch (err) {
      return res.status(500).send({
        error: Errors.remove
      });
    }
  });

// Admin Routes
router
  .use('/', isLogin, isAdmin)
  .route('/')
  .get(userValidator('list'), async (req, res) => {
    try {
      const users = await UserService.list(req.items);
      return res.send(users);
    } catch (err) {
      return res.status(500).send({
        error: Errors.list
      });
    }
  })
  .post(userValidator('create'), async (req, res) => {
    try {
      const user = await UserService.create(req.body, req.query);
      return res.send(user);
    } catch (err) {
      return res.status(500).send({
        error: Errors.create
      });
    }
  });

module.exports = router;
