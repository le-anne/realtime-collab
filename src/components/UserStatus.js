import React, { useState, useEffect } from 'react';
import '../index.css';

const UserStatus = ({ socket }) => {
  const [userStatusMessage, setUserStatusMessage] = useState('');

  useEffect(() => {
    console.log('User Status effect, has socket?', !!socket);

    if (!socket) {
      return;
    }

    socket.on('connect', () => {
      console.log('Socket connected with ID:', socket.id);
    });

    socket.on('userStatus', (message) => {
      console.log('Received message:', message);
      setUserStatusMessage(message);
      setTimeout(() => {
        setUserStatusMessage('');
      }, 3000);
    });

    return () => {
      console.log('User Status effect cleanup');
    };
  }, [socket]);

  return <div className="user-status">{userStatusMessage}</div>;
};

export default UserStatus;
