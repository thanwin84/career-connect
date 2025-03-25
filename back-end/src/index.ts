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
import { populateRoles } from './seedRoles';
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
      console.log(`Server is running on port ${port}`);
      populateRoles();
      redisConnect().then(() => {
        console.log('redis is connected');
      });
    });
  })
  .catch((error) => console.log('mongodb connection failed error ', error));
