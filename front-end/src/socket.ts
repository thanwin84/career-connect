import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BACkEND_URL, {
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 200,
});

export default socket;
