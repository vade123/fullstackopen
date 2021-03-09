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
  const token = req.token;
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid ' });
    }
    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id,
      comments: []
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.status(201).json(savedBlog);

  } catch(error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (req, res, next) => {
  const token = req.token;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'not found' });
    }
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(blog.user.toString());
    console.log(decodedToken.id);
    if (blog.user.toString() !== decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid ' });
    }

    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch(error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (req, res, next) => {
  const token = req.token;

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'not found' });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (blog.user.toString() !== decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid ' });
    }
    const newBlog = new Blog({
      _id: req.params.id,
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes,
      user: decodedToken.id,
      comments: blog.comments
    });
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, newBlog, { new: true } );
    res.json(updatedBlog.toJSON());
  } catch(error) {
    next(error);
  }
});

blogsRouter.post('/:id/comments', async (req, res, next) => {
  const token = req.token;

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'not found' });
    }
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid ' });
    }
    const newBlog = new Blog({
      _id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: blog.user,
      comments: blog.comments.concat(req.body.newcomment)
    });
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, newBlog, { new: true } );
    res.json(updatedBlog.toJSON());
  } catch(err) {
    next(err);
  }
});

module.exports = blogsRouter;