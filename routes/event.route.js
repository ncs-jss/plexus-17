const router = require('express').Router();
const { joiValidate } = require('express-joi');

const eventJoi = require('../models/validations/event.joi');
const { isLogin, isAdmin } = require('../middlewares/roleManager.mw');
const isValidId = require('../middlewares/validId.mw');
const EventService = require('../services/event.service');
const Errors = require('../services/lang/Errors');

const eventValidator = (method, req, res, next) => (req, res, next) => {
  const role = req.user ? req.user.role : 'public';
  const validationSchema = eventJoi[method][role];
  if (validationSchema) {
    return joiValidate(validationSchema)(req, res, next);
  }
  return res.status(401).send({
    error: `Not allowed for ${role}`
  });
};

router
  .use('/:id', isValidId)
  .route('/:id')
  .get(eventValidator('get'), async (req, res) => {
    let { id } = req.items;
    try {
      const event = await EventService.get(id, req.query);
      res.send(event);
    } catch (err) {
      return res.status(500).send({
        error: Errors.get
      });
    }
  })
  .put(eventValidator('update'), async (req, res) => {
    //todo
  })
  .delete(eventValidator('remove'), async (req, res) => {
    //todo
  });

router
  .route('/')
  .get(eventValidator('list'), async (req, res) => {
    try {
      const events = await EventService.list(req.items);
      return res.send(events);
    } catch (err) {
      return res.status(500).send({
        error: Errors.list
      });
    }
  })
  .post(eventValidator('create'), isAdmin, async (req, res) => {
    try {
      req.body = Object.assign(req.body, {
        state: 'toStart',
        createdBy: 'individual'
      });
      const event = await EventService.create(req.body, req.query);
      return res.send(event);
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        error: Errors.create
      });
    }
  });

module.exports = router;
