const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find().populate('user', { username: 1, name: 1, id: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body;
  const users = await User.find();
  const user = users[0];
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  });

  try {
    const res = await blog.save();
    user.blogs = user.blogs.concat(res._id);
    await user.save();
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