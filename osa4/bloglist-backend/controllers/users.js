const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    if (!body.password) {
      res.status(400).json({ error: 'User validation failed: password: Path `password` is missing' });
    }
    else if (body.password.length < 3) {
      res.status(400).json({ error: `User validation failed: password: Path 'password' ('${body.password}') is shorter than the minimum allowed length (3).` });
    } else {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(body.password, saltRounds);
      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
      });

      const savedUser = await user.save();
      res.status(201).json(savedUser);
    }
  } catch(err) {
    next(err);
  }
});

usersRouter.get('/', async (req, res) => {
  const users = await User.find().populate('blogs', { title: 1, url: 1, author: 1, id: 1 });
  res.json(users);
});

module.exports = usersRouter;