import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import connectToDB from './db/index';
import errorHandler from './middleware/errorHandler';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { corsOptions } from './config/corsOption';
import http from 'http';
import { Server } from 'socket.io';
import { redisConnect } from './config/redis';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// parse incoming json request
app.use(express.json());
//parse incoming URL-enconded data with extended options and limit of 16kb
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());
app.use(cors(corsOptions));

// routes import
import jobRouter from './routes/job.route';
import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';
import recordsRouter from './routes/records.route';
import jobApplicationRouter from './routes/jobApplication.route';
import accoutSettingRouter from './routes/accountSetting.route';
import verificationRouter from './routes/verification.route';
import notificationRouter from './routes/notification.route';

// routes declaration
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/account-setting', accoutSettingRouter);
app.use('/api/v1/verification', verificationRouter);
app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/records', recordsRouter);
app.use('/api/v1/job-applications', jobApplicationRouter);
app.use('/api/v1/notifications', notificationRouter);

// app.use(express.static(path.resolve(__dirname, "./public")))
app.get('/health', (req, res) => {
  res.send({ success: 'true' });
});

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Not Found' });
});

app.use(errorHandler);

const port = process.env.PORT || 5100;

const onlineUsers = new Map();
// socket
io.on('connection', (socket) => {
  socket.on('register', (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on('disconnect', () => {});
});

export { io, onlineUsers };

connectToDB()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log('Server is running on port ', port);
      redisConnect().then((res) => {
        console.log('redis is connected');
      });
    });
  })
  .catch((error) => console.log('mongodb connection failed error ', error));
