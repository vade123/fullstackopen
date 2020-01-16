const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const User = require('../models/user');
const helper = require('./test_helper');

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({ username: 'root', password: 'sekret' });
    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('duplicate usernames cannot be created', async () => {
    const legitUser = {
      username: 'kayttis',
      name: 'Teemu Teekkari',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(legitUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtStart = await helper.usersInDb();

    await api
      .post('/api/users')
      .send(legitUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test('users with incorrect usernames or passwords are not created', async () => {
    const usersAtStart = await helper.usersInDb();

    const faultyUsername = {
      username: 'as',
      name: 'jeppis jepulis',
      password: 'kaksoispistedee'
    };

    await api
      .post('/api/users')
      .send(faultyUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const faultyPassword = {
      username: 'hyvausername',
      name: 'jeppis jepulis',
      password: 'kd'
    };

    await api
      .post('/api/users')
      .send(faultyPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const faultyEverything = {
      username: 'as',
      name: 'jeppis jepulis',
      password: 'ks'
    };

    await api
      .post('/api/users')
      .send(faultyEverything)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);

  });

  test('all users are returned', async () => {
    const response = await api.get('/api/users');
    const usersAtEnd = await helper.usersInDb();
    expect(response.body.length).toBe(usersAtEnd.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});