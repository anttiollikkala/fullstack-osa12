const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis');
const mongoose = require('mongoose')
/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  let count = await redis.getAsync('count');
  await redis.setAsync('count', parseInt(count || 0)+1)
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  console.log(req.todo)
  if (!req.todo) return res.sendStatus(404)
  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const {text, done} = req.body
  req.todo.done = done
  req.todo.text = text
  const saved = await req.todo.save()
  res.send(saved)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
