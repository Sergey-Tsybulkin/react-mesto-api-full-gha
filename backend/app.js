const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('./middlewares/cors');
const config = require('./config');


const { logger, requestLoggingMiddleware } = require('./middlewares/logger');
const rootRouter = require('./routes');

mongoose.set('strictQuery', true);
mongoose.connect(config.DB_URL);

const app = express();

app.use(requestLoggingMiddleware); // Adding middleware for request logging



app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors); // Using CORS

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('The server is about to crash');
  }, 0);
});

app.use(limiter);
app.use(rootRouter);

app.use(errors());
app.use(errorHandler);

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});