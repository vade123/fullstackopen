const errorHandler = (error, req, res, next) => {
    if (error.name === 'ValidationError') {
        return res.status(400).send({ error: error.message });
    }
    next(error);
};

module.exports = { errorHandler };