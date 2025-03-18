import http from 'http';
import { Server } from 'socket.io';

const onlineUsers = new Map();
export const startSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
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
