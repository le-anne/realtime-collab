import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import TextEditor from "./components/TextEditor";
import UserCounter from "./components/UserCounter";
import UserStatus from "./components/UserStatus";

import "./index.css";



const App = () => {
  const [socket, setSocket] = useState(null);
  const [userStatusMessage, setUserStatusMessage] = useState("");

  useEffect(() => {
    const newSocket = io("https://realtime-collab.herokuapp.com/");
    setSocket(newSocket);

    newSocket.on("text-update", (updatedText) => {
      setText(updatedText);
    });

    newSocket.on("userStatus", (message) => {
      setUserStatusMessage(message);
    });

    return () => newSocket.disconnect();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1 className="card-title">Real-time Collaborative Text Editor</h1>
        <div className="editor-container">
          <TextEditor />
          <UserStatus userStatusMessage={userStatusMessage} />
          <UserCounter />
        </div>
      </div>
    </div>
  );
};

export default App;
