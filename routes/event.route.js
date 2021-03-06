const router = require('express').Router();
const Joi = require('joi');

const eventJoi = require('../models/validations/event.joi');
const joiValidator = require('../middlewares/joiValidator.mw');
const { isLogin, isAdmin } = require('../middlewares/roleManager.mw');
const isValidId = require('../middlewares/validId.mw');
const User = require('mongoose').model('User');
const Arena = require('mongoose').model('Arena');
const EventService = require('../services/event.service');
const Errors = require('../services/lang/Errors');

const eventValidator = method => {
  const eventSchema = eventJoi[method];
  if (eventSchema) {
    return joiValidator(eventSchema);
  }
  return res.status(404).send({
    error: `${method} on events not allowed`
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
      console.log('err', err);
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

router.post('/:id/participate', isLogin, async (req, res) => {
  const eventId = req.params.id;
  const userId = req.user.id;
  const existingArena = await Arena.findOne(
    {
      _event: eventId,
      _user: userId
    },
    {
      lean: true
    }
  );
  if (existingArena) {
    return res.status(200).send({
      content: existingArena,
      error: 'Arena for this event already exists'
    });
  }
  const arena = new Arena({
    _event: eventId,
    _user: userId
  });
  const userPromise = User.findByIdAndUpdate(userId, {
    $push: {
      _arena: arena._id
    }
  });

  await Promise.all([arena.save(), userPromise]);
  res.status(201).send(arena);
});

router
  .route('/')
  .get(eventValidator('list'), async (req, res) => {
    try {
      const events = await EventService.list(req.items);
      return res.send(events);
    } catch (err) {
      console.log('err', err);
      return res.status(500).send({
        error: Errors.list
      });
    }
  })
  .post(eventValidator('create'), isAdmin, async (req, res) => {
    try {
      Object.assign(req.body, {
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
