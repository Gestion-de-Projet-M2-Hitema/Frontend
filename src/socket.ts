import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? "https://gestion-de-projet-m2-ws.onrender.com" : 'http://localhost:3001';

export const socket = io("http://localhost:3001");
// export const socket = io("wss://localhost:3001", { transports: ['websocket'], path: '/SERVERPATH', forceNew: true, reconnectionAttempts: 3, timeout: 2000, });
