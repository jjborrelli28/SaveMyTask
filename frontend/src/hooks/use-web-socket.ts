import { useEffect } from 'react';

const useWebSocket = (onMessage: (message: any) => void) => {
  const socketUrl = import.meta.env.VITE_TODO_APP_WEBSOCKET_URL;

  useEffect(() => {
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      if (import.meta.env.VITE_ENV === 'development')
        console.log('Connected to WebSocket server');
    };

    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    socket.onclose = () => {
      if (import.meta.env.VITE_ENV === 'development')
        console.log('Disconnected from WebSocket server');
    };

    socket.onerror = error => {
      if (import.meta.env.VITE_ENV === 'development')
        console.error('WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  }, [onMessage]);
};

export default useWebSocket;
