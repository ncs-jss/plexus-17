const router = require('express').Router();
const { joiValidate } = require('express-joi');

const questionJoi = require('../models/validations/question.joi');
const { isLogin, isAdmin } = require('../middlewares/roleManager.mw');
const isValidId = require('../middlewares/validId.mw');
const QuestionService = require('../services/question.service');
const Errors = require('../services/lang/Errors');

const questionValidator = (method, req, res, next) => (req, res, next) => {
  const role = req.user ? req.user.role : 'public';
  const validationSchema = questionJoi[method][role];
  if (validationSchema) {
    return joiValidate(validationSchema)(req, res, next);
  }
  return res.status(401).send({
    error: `Not allowed for ${role}`
  });
};

//remember to exclude the answer field for users. The answer should only be visible to admin and the event coordinator

router
  .route('/')
  .get(questionValidator('list'), isAdmin, async (req, res) => {
    try {
      const questions = await QuestionService.list(req.items);
      return res.send(questions);
    } catch (err) {
      return res.status(500).send({
        error: Errors.list
      });
    }
  })
  .post(questionValidator('create'), isAdmin, async (req, res) => {
    try {
      const question = await QuestionService.create(req.body, req.query);
      return res.send(question);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        error: Errors.create
      });
    }
  });

module.exports = router;
