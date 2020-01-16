const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    if (body.password.length < 3) {
      res.status(400).json({ error: `User validation failed: username: Path 'password' ('${body.password}') is shorter than the minimum allowed length (3).` });
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
  const response = await User.find();
  res.json(response);
});

module.exports = usersRouter;