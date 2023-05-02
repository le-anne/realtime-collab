import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const UserStatus = () => {
  const socketRef = React.useRef();
  const [userStatusMessage, setUserStatusMessage] = useState("");

  useEffect(() => {
    console.log("useEffect hook called");

    socketRef.current = io.connect("/");

    socketRef.current.on("connect", () => {
      console.log("Socket connected");
    });

    socketRef.current.on("userStatus", (message) => {
      console.log("Received message:", message);
      setUserStatusMessage(message);
      setTimeout(() => {
        setUserStatusMessage("");
      }, 3000);
      console.log("userStatusMessage state:", userStatusMessage);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return <div className="user-status">{userStatusMessage}</div>;
};

export default UserStatus;
