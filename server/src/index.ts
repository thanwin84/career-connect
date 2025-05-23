import express from 'express';
import morgan from 'morgan';
import connectToDB from './db/index';
import errorHandler from './middleware/errorHandler';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { corsOptions } from './config/corsOption';
import http from 'http';
import { redisConnect } from './config/redis';
import configureRoute from './routes';
import { deleteAccountWorker } from './tasks/account-deletion/deleteAccountWorker';
import { startSocket } from './socket';
import { appConfig } from './config/appConfig';

import { logger } from './utils/logger';
import { populateRoles } from './scripts/seedRoles';

const app = express();
const server = http.createServer(app);

if (appConfig.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// parse incoming json request
app.use(express.json());
//parse incoming URL-enconded data with extended options and limit of 16kb
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());
app.use(cors(corsOptions));

configureRoute(app);
app.use(errorHandler);
// start workers
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
deleteAccountWorker;

//seeding

// health check
app.get('/health', (_req, res) => {
  res.send({ success: 'true' });
});

app.use('*', (_req, res) => {
  res.status(404).json({ msg: 'Not Found' });
});

const port = process.env.PORT || 5100;

export const { io, onlineUsers } = startSocket(server);

connectToDB()
  .then(() => {
    server.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
      populateRoles();

      redisConnect().then(() => {
        logger.info('redis is connected');
      });
    });
  })
  .catch((error) => logger.error('mongodb connection failed error ', error));
