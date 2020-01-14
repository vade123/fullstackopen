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

module.exports = blogsRouter;