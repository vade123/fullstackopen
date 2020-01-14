const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const helper = require('./test_helper');

beforeEach(async () => {
    await Blog.deleteMany({});

    for (let blog of helper.initialBlogs) {
        let blogObj = new Blog(blog);
        await blogObj.save();
    }
});

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(helper.initialBlogs.length);
});

test('all returned blogs have a field "id"', async () => {
    const res = await api.get('/api/blogs');
    res.body.forEach(blog => {
        expect(blog.id).toBeDefined();
        expect(blog._id).toBeUndefined();
    });
});

afterAll(() => {
    mongoose.connection.close();
});

