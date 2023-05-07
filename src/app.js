import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import TextEditor from './components/TextEditor';
import UserCounter from './components/UserCounter';
import UserStatus from './components/UserStatus';

import './index.css';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [userStatusMessage, setUserStatusMessage] = useState('');

  useEffect(() => {
    const sock = io('/');

    sock.on('connect', () => {
      console.log('Socket connected with ID:', sock.id);
    });

    sock.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    setSocket(sock);

    return () => sock.disconnect();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1 className="card-title">Real-time Collaborative Text Editor</h1>
        <div className="editor-container">
          <TextEditor socket={socket} />
          <UserStatus socket={socket} />
          <UserCounter socket={socket} />
        </div>
      </div>
    </div>
  );
};

export default App;
