import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import TextEditor from "./components/TextEditor";

import "./index.css";

const App = () => {
  const [socket, setSocket] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.on("text-update", (updatedText) => {
      setText(updatedText);
    });

    return () => newSocket.disconnect();
  }, []);

  const handleTextChange = (event) => {
    const updatedText = event.target.value;
    setText(updatedText);
    socket.emit("text-change", updatedText);
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="card-title">Real-time Collaborative Text Editor</h1>
        <TextEditor />
      </div>
    </div>
  );
};

export default App;
