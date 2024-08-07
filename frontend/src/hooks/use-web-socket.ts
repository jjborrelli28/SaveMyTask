import { useEffect, useRef, useState } from 'react';
import { WebSocketMessage } from '../types';

const useWebSocket = (onMessage: (message: WebSocketMessage) => void) => {
  const SOCKET_URL = import.meta.env.VITE_TODO_APP_WEBSOCKET_URL;
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const maxReconnectAttempts = 5;
  const reconnectInterval = 3000;

  const socketRef = useRef<WebSocket | null>(null);

  const connect = () => {
    const socket = new WebSocket(SOCKET_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      if (import.meta.env.VITE_ENV === 'development')
        console.log('Connected to WebSocket server');
      setReconnectAttempts(0);
    };

    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    socket.onclose = () => {
      if (import.meta.env.VITE_ENV === 'development')
        console.log('Disconnected from WebSocket server');
      if (reconnectAttempts < maxReconnectAttempts) {
        setTimeout(() => {
          setReconnectAttempts(prev => prev + 1);
          connect();
        }, reconnectInterval);
      } else {
        console.error('Max reconnect attempts reached');
      }
    };

    socket.onerror = error => {
      if (import.meta.env.VITE_ENV === 'development')
        console.error('WebSocket error:', error);
      socket.close();
    };
  };

  useEffect(() => {
    connect();

    return () => {
      socketRef.current?.close();
    };
  }, [onMessage]);

  return socketRef.current;
};

export default useWebSocket;
