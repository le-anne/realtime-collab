import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const UserCounter = () => {
  const [userCount, setUserCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("/");

    socketRef.current.on("userCount", (count) => {
      setUserCount(count);
    });

    socketRef.current.on("userStatus", (message) => {
      setStatusMessage(message);
      setTimeout(() => {
        setStatusMessage("");
      }, 3000);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <div>
      <div className="user-counter">Users connected: {userCount}</div>

      {statusMessage && <div className="user-status">{statusMessage}</div>}
    </div>
  );
};

export default UserCounter;
