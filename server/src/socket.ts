import http from 'http';
import { Server } from 'socket.io';
import { appConfig } from './config/appConfig';

const onlineUsers = new Map<string, string>(); // userId: socketId
export const startSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: appConfig.FRONT_END_BASE_URL,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });
  io.on('connection', (socket) => {
    socket.on('register', (userId) => {
      onlineUsers.set(userId, socket.id);
    });
    socket.on('disconnect', () => {});
  });

  return { io, onlineUsers };
};
