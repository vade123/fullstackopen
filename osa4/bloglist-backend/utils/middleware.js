const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message });
  }
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' });
  }
  next(error);
};

const tokenExtractor = (req, res, next) => {
  const auth = req.get('authorization');
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    req.token = auth.substring(7);
  } else {
    req.token = null;
  }
  next();
};

module.exports = { errorHandler, tokenExtractor };