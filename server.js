const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("build"));

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
});

const PORT = process.env.PORT || 3001;

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
