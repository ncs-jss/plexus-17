const router = require('express').Router();
const { joiValidate } = require('express-joi');

const User = require('../models/User');
const userValidator = require('../models/validations/user');
const { isLogin, isAdmin, isAdminOrSelf } = require('../middlewares/roleManager.mw');

router.use('/:id', isLogin);

// User Routes
router
  .route('/:id')
  .get(joiValidate(userValidator.get), isAdminOrSelf, async (req, res) => {
    let { id } = req.items;
    const user = await User.findById(id);
    res.send(user);
  })
  .put(joiValidate(userValidator.update), isAdminOrSelf, async (req, res) => {
    const { id } = req.items;
    const user = await User.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true });
    return res.send(user);
  });

// Admin Routes
router.get('', isAdmin, joiValidate(userValidator.getList), async (req, res) => {
  let { limit, skip, fields } = req.items;
  limit = parseInt(limit);
  skip = parseInt(skip);
  const users = await User.find()
    .limit(limit)
    .skip(skip);
  res.send(users);
});

module.exports = router;
