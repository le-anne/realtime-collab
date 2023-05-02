import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const UserCounter = () => {
  const [userCount, setUserCount] = useState(0);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("/");

    socketRef.current.on("userCount", (count) => {
      setUserCount(count);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return <div className="user-counter">Users connected: {userCount}</div>;
};

export default UserCounter;
