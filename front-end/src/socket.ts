import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BACkEND_URL);

export default socket;
