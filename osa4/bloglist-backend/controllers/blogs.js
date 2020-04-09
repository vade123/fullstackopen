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
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'not found' });
    }
    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    if (!blog.user.toString() === decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid ' });
    }

    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch(error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (req, res, next) => {
  const newBlog = new Blog({
    _id: req.params.id,
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    user: req.body.user,
  });
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'not found' });
    }

    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!blog.user.toString() === decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid ' });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, newBlog, { new: true } );
    res.json(updatedBlog.toJSON());
  } catch(error) {
    next(error);
  }
});

module.exports = blogsRouter;