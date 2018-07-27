import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from './logger';
import loggerMiddleware from './logger-middleware';
import errorMiddleWare from './error-middleware';

const app = express();
let server = null;

app.use(cors({
  origin: process.env.CORS_ORIGINS.split(' '),
  credentials: true,
}));
app.use(cookieParser());

app.use(loggerMiddleware);
app.all('*', (request, response) => {
  logger.log(logger.INFO, 'SERVER: Returning a 404 from the catch-all/default route');
  return response.sendStatus(404);
});
app.use(errorMiddleWare);

const startServer = () => {
  return mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      server = app.listen(process.env.PORT, () => {
        logger.log(logger.INFO, `Server is listening on port ${process.env.PORT}`);
      });
      return undefined;
    })
    .catch((err) => {
      logger.log(logger.ERROR, `something happened, ${JSON.stringify(err)}`);
    });
};

const stopServer = () => {
  return mongoose.disconnect()
    .then(() => {
      return server.close(() => {
        logger.log(logger.INFO, 'Server is off');
      });
    })
    .catch((err) => {
      return logger.log(logger.ERROR, `something happened, ${JSON.stringify(err)}`);
    });
};

export { startServer, stopServer };
