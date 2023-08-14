const expressWinston = require('express-winston');
const winston = require('winston');

// creating logger
const errorLoggerMiddlewere = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

// middleware for loggin
const requestLoggerMiddlewere = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLoggerMiddlewere,
  errorLoggerMiddlewere,
};
