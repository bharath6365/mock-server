const winston = require('winston');


interface Logger {
    info: Function
    warn: Function
    error: Function
}
let _logger: Logger;

export const getLogger = (): Logger => {
  if (!_logger) {
    _logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(), // Add timestamp to logs
        winston.format.simple() // Use the default log format
      ),
      transports: [
        new winston.transports.Console(),
      ]
    });
  }
  
  return _logger;
}