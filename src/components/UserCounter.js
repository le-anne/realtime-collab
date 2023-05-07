import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../index.css";

const UserCounter = () => {
  const [userCount, setUserCount] = useState(0);
  const [socket, setSocket] = useState(null);
  const serverUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://realtime-collab.herokuapp.com/";

  useEffect(() => {
    const newSocket = io(serverUrl);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [serverUrl]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Socket connected with ID:", socket.id);
      });

      socket.on("userCount", (count) => {
        console.log("Received user count:", count);
        setUserCount(count);
      });
    }

    return () => {
      if (socket) {
        socket.off("connect");
        socket.off("userCount");
      }
    };
  }, [socket]);

  console.log("userCount:", userCount);

  return <div className="user-count">{userCount} users online</div>;
};

export default UserCounter;
