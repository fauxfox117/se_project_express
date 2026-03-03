const winston = require("winston");
const expressWinston = require("express-winston");

// custom logger configuration
const errorLogger = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    ({ level, message, meta, timestamp }) =>
      `${timestamp} ${level}: ${meta.error?.stack || message}`
  )
);

// request logger
const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: "requests.log" })],
  format: winston.format.json(),
});

// exports
module.exports = {
  requestLogger,
  errorLogger,
};
