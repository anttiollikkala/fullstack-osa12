const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis');

/* GET statistics */
router.get('/', async (_, res) => {
  const count = await redis.getAsync('count');
  res.send({
    added_todos: parseInt(count || 0)
  });
});

module.exports = router;
