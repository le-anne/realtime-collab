const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
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

io.on("connection", (socket) => {
  userCount++;
  console.log("a user connected", socket.id);
  io.emit("userStatus", "A user has joined the text editor.");
  io.emit("userCount", userCount);

  socket.on("disconnect", () => {
    userCount--;
    console.log("user disconnected", socket.id);
    io.emit("userStatus", "A user has left the text editor.");
    io.emit("userCount", userCount);
  });

  socket.on("text-change", (updatedText) => {
    // emit the updated text to all other clients
    socket.broadcast.emit("text-update", updatedText);
  });
});
