const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find().populate('user', { username: 1, name: 1, id: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body;
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid ' });
    }
    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.status(201).json(savedBlog.toJSON());

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
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true } );
    res.json(updatedBlog.toJSON());
  } catch(error) {
    next(error);
  }
});

module.exports = blogsRouter;