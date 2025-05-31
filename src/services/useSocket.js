import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_BASE_URL_API_LOCAL; // 👈 thay bằng env nếu cần

const useSocket = (userId) => {
  const socketRef = useRef(null);

  useEffect(() => {
    // Kết nối socket khi component mount
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket'], // hoặc 'polling' nếu server cần fallback
      withCredentials: true
    });

    socketRef.current.on('connect', () => {
      console.log('🔌 Connected to socket.io server');

      // Tham gia phòng riêng của user
      if (userId) {
        socketRef.current.emit('join_user_room', userId);
      }
    });

    socketRef.current.on('disconnect', () => {
      console.log('❌ Disconnected from socket.io server');
    });

    return () => {
      // Cleanup khi component unmount
      socketRef.current.disconnect();
    };
  }, [userId]);

  return socketRef;
};

export default useSocket;
