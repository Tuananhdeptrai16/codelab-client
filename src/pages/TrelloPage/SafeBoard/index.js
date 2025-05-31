// src/components/SafeBoard.js
import React, { useEffect } from 'react';
import Board from 'react-trello';

const SafeBoard = (props) => {
  useEffect(() => {
    const originalWarn = console.warn;
    const originalError = console.error;

    // Suppress all console.warn and console.error
    console.warn = (msg, ...args) => {
      if (typeof msg === 'string' && msg.includes('React does not recognize')) return;
      if (msg.includes('Warning: Failed prop type')) return; // Chặn các cảnh báo về kiểu prop
      originalWarn(msg, ...args);
    };

    console.error = (msg, ...args) => {
      if (typeof msg === 'string' && msg.includes('React does not recognize')) return;
      if (msg.includes('Warning: Failed prop type')) return; // Chặn các lỗi về kiểu prop
      originalError(msg, ...args);
    };

    // Cleanup function to restore original console methods
    return () => {
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, []);  // Chạy 1 lần khi component mount

  return <Board {...props} />;
};

export default SafeBoard;
