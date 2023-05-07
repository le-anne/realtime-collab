import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../index.css";

const UserCounter = () => {
  const socketRef = React.useRef();
  const [userCount, setUserCount] = useState(0);
  const serverUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://realtime-collab.herokuapp.com/";

  useEffect(() => {
    socketRef.current = io(serverUrl);

    socketRef.current.on("connect", () => {
      console.log("Socket connected with ID:", socketRef.current.id);
    });

    socketRef.current.on("userCount", (count) => {
      console.log("Received user count:", count);
      setUserCount(count);
    });

    return () => {
      console.log("Disconnecting socket");
      socketRef.current.disconnect();
    };
  }, []);

  console.log("userCount:", userCount);

  return <div className="user-count">{userCount} users online</div>;
};

export default UserCounter;
