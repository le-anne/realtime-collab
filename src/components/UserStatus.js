import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../index.css";

const UserStatus = () => {
  const socketRef = React.useRef();
  const [userStatusMessage, setUserStatusMessage] = useState("");
  const serverUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://realtime-collab.herokuapp.com/";

  useEffect(() => {
    console.log("Starting effect to connect socketio", serverUrl);
    socketRef.current = io(serverUrl);

    socketRef.current.on("connect", () => {
      console.log("Socket connected with ID:", socketRef.current.id);
    });

    socketRef.current.on("userStatus", (message) => {
      console.log("Received message:", message);
      setUserStatusMessage(message);
      setTimeout(() => {
        setUserStatusMessage("");
      }, 3000);
    });

    return () => {
      console.log("Disconnecting socket");
      socketRef.current.disconnect();
    };
  }, []);

  return <div className="user-status">{userStatusMessage}</div>;
};

export default UserStatus;
