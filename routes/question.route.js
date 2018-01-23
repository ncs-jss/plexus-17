const router = require('express').Router();
const Joi = require('joi');

const questionJoi = require('../models/validations/question.joi');
const joiValidator = require('../middlewares/joiValidator.mw');
const { isLogin, isAdmin } = require('../middlewares/roleManager.mw');
const isValidId = require('../middlewares/validId.mw');
const QuestionService = require('../services/question.service');
const Errors = require('../services/lang/Errors');

const questionValidator = method => {
  const questionSchema = questionJoi[method];
  if (questionSchema) {
    return joiValidator(questionSchema);
  }
  return res.status(404).send({
    error: `${method} on questions not allowed`
  });
};

//remember to exclude the answer field for users. The answer should only be visible to admin and the event coordinator

router
  .use('/:id', isValidId)
  .route('/:id')
  .get(questionValidator('get'), async (req, res) => {
    let { id } = req.items;
    try {
      const question = await QuestionService.get(id, req.query);
      res.send(question);
    } catch (err) {
      return res.status(500).send({
        error: Errors.get
      });
    }
  });

router
  .route('/')
  .get(questionValidator('list'), isAdmin, async (req, res) => {
    try {
      const questions = await QuestionService.list(req.items);
      return res.send(questions);
    } catch (err) {
      console.log('err', err);
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
