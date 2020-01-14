const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
    const res = await Blog.find();
    response.json(res);
});

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body);
    const res = await blog.save();
    response.status(201).json(res);
});

module.exports = blogsRouter;