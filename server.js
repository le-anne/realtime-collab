const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
import io from "socket.io-client";
const path = require("path");

const HOST = "0.0.0.0"; // listen on all network interfaces
const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});

app.use(express.static("build"));
app.get("/socket.io.js", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "node_modules",
      "socket.io-client",
      "dist",
      "socket.io.js"
    )
  );
});

let userCount = 0;

console.log("socketRef.current:", socketRef.current);
console.log("socketRef.current.on:", socketRef.current.on);

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("enterEditor", () => {
    io.emit("userStatus", "A user has entered the editor");
  });

  socket.on("leaveEditor", () => {
    io.emit("userStatus", "A user has left the editor");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
