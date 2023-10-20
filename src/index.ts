import colors from 'colors';
import { Server } from 'http';
import mongoose, { ConnectOptions } from 'mongoose';
import app from './app';
import config from './config/config';
import logger from './config/logger';

let server: Server;
mongoose
  .connect(config.mongoose.url, config.mongoose.options as ConnectOptions)
  .then(() => {
    logger.info(colors.blue.bold('Connected to MongoDB'));
    server = app.listen(config.port, () => {
      logger.info(colors.yellow.bold(`Listening to port ${config.port}`));
    });
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.error(colors.red.bold('Server closed'));
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  logger.error(colors.red.bold(error.toString()));
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info(colors.red.bold('SIGTERM received'));
  if (server) {
    server.close();
  }
});
