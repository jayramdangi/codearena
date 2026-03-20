import { io } from 'socket.io-client';

let socket = null;
let identifyTimeout = null;

export const createSocket = (opts = {}) => {
  if (socket) return socket;

  socket = io(import.meta.env.VITE_API_URL, {
    withCredentials: true,
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    autoConnect: true,
    transports: ['websocket', 'polling'],
    ...opts
  });

  return socket;
};

export const initSocket = (opts = {}) => {
  if (!socket) {
    socket = createSocket(opts);
  }
  return socket;
};

export const getSocket = () => socket;

export const identifyUser = (userId) => {
  if (socket && socket.connected && userId) {
    if (identifyTimeout) clearTimeout(identifyTimeout);
    
    identifyTimeout = setTimeout(() => {
      try {
        socket.emit('onevsone:identify', userId);
      } catch (error) {
        console.warn('Failed to identify user via socket:', error);
      }
    }, 500);
  }
};

export const disconnectSocket = () => {
  if (socket) {
    try {
      socket.disconnect();
    } catch (error) {
      console.warn('Error disconnecting socket:', error);
    }
    socket = null;
  }
  
  if (identifyTimeout) {
    clearTimeout(identifyTimeout);
    identifyTimeout = null;
  }
};

export const emitSocket = (event, payload) => {
  if (socket && socket.connected) {
    try {
      socket.emit(event, payload);
      return true;
    } catch (error) {
      console.error(`Error emitting socket event ${event}:`, error);
      return false;
    }
  } else {
    console.warn(`Socket not connected, cannot emit ${event}`);
    return false;
  }
};