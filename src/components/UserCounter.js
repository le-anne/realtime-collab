import React, { useState, useEffect } from 'react';

const UserCounter = ({ socket }) => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    console.log('UserCounter effect, has socket?', !!socket);

    if (!socket) {
      return;
    }

    socket.emit('askUserCount')

    socket.on('userCount', (count) => {
      setUserCount(count);
    });

    return () => {
      socket.off('userCount');
    };
  }, [socket]);

  return (
    <div>
      <h3>Users Online: {userCount}</h3>
    </div>
  );
};

export default UserCounter;
