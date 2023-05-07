const express = require("express");
const app = express();
const socketIO = require("socket.io");
const path = require("path");

const HOST = "0.0.0.0";
const PORT = process.env.PORT || 3000;
const INDEX = "/index.html";

app.use((req, res) => res.sendFile(INDEX, { root: __dirname }));
app.listen(PORT, HOST, () => {
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

const io = socketIO(app);

let userCount = 0;

io.on("connection", (socket) => {
  console.log("User connected");
  userCount++;

  socket.on("enterEditor", () => {
    io.emit("userStatus", "A user has entered the editor");
  });

  socket.on("leaveEditor", () => {
    io.emit("userStatus", "A user has left the editor");
  });

  io.emit("userCount", userCount);

  socket.on("disconnect", () => {
    console.log("User disconnected");
    userCount--;
    io.emit("userCount", userCount);
  });
});
