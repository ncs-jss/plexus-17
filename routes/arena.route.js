const router = require('express').Router();

const Arena = require('mongoose').model('Arena');

router.get('/', async (req, res) => {
  const arenas = await Arena.find({});
  res.send(arenas);
});

module.exports = router;
