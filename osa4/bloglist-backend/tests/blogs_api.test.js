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

test('a valid blog can be added', async () => {
  const newBlog = {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map(b => b.title);
  expect(titles).toContain('Type wars');
});

test('likes are initialized to 0', async () => {
  const newBlog = {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  blogsAtEnd.forEach(blog => expect(blog.likes).toBeGreaterThanOrEqual(0));

});

test('blogs with missing fields "title" or "url" are not added', async () => {
  const newBlog1 = {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
  };
  const newBlog2 = {
    _id: '5a422bc61b54a676234d17fc',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  };
  const newBlog3 = {
    _id: '5a422bc61b54a676234d17fc',
    author: 'Robert C. Martin',
  };
  await api
    .post('/api/blogs')
    .send(newBlog1)
    .expect(400);
  await api
    .post('/api/blogs')
    .send(newBlog2)
    .expect(400);
  await api
    .post('/api/blogs')
    .send(newBlog3)
    .expect(400);
});

test('blogs can be removed', async () => {
  await api
    .delete('/api/blogs/5a422aa71b54a676234d17f8')
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1);

  const titles = blogsAtEnd.map(b => b.title);
  expect(titles).not.toContain('Go To Statement Considered Harmful');
});

test('blogs can be updated', async () => {
  const updatedBlog = {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 10,
    __v: 0
  };

  const result = await api
    .put('/api/blogs/5a422ba71b54a676234d17fb')
    .send(updatedBlog)
    .expect('Content-Type', /application\/json/);

  expect(result.body.likes).toBe(10);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});

