import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { initSocket, getSocket, disconnectSocket, identifyUser } from '../services/socketService';

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export function SocketProvider({ children }) {
  const { user } = useSelector((state) => state.auth);
  const [socket, setSocket] = useState(null);
  const [connectionState, setConnectionState] = useState('disconnected');

  useEffect(() => {
    const s = initSocket();
    setSocket(s);
    setConnectionState('connecting');

    const handleConnect = () => {
      setConnectionState('connected');
      
      // Identify user if authenticated
      if (user?._id) {
        identifyUser(user._id);
      }
    };

    const handleDisconnect = () => {
      setConnectionState('disconnected');
    };

    const handleReconnect = () => {
      setConnectionState('connected');
      
      // Re-identify after reconnect
      if (user?._id) {
        setTimeout(() => identifyUser(user._id), 800);
      }
    };

    s.on('connect', handleConnect);
    s.on('disconnect', handleDisconnect);
    s.on('reconnect', handleReconnect);

    return () => {
      s.off('connect', handleConnect);
      s.off('disconnect', handleDisconnect);
      s.off('reconnect', handleReconnect);
      disconnectSocket();
      setSocket(null);
      setConnectionState('disconnected');
    };
  }, []);

  // Re-identify when user changes
  useEffect(() => {
    if (socket && connectionState === 'connected' && user?._id) {
      identifyUser(user._id);
    }
  }, [socket, user?._id, connectionState]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}