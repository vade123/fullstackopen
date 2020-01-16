const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const res = await Blog.find();
  response.json(res);
});

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body);
  try {
    const res = await blog.save();
    response.status(201).json(res);
  } catch(error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch(error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (req, res, next) => {
  const blog = new Blog(req.body);
  try {
    const response = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true } );
    res.json(response.toJSON());
  } catch(error) {
    next(error);
  }
});

module.exports = blogsRouter;