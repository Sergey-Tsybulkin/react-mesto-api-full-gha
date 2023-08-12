const errorHandler = (err, _, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'An error occurred on the server' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
