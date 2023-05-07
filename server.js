const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const socketIO = require("socket.io"); // change this line

const HOST = "0.0.0.0"; // listen on all network interfaces
const PORT = process.env.PORT || 3000;
const INDEX = "/index.html";

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", () => console.log("Client disconnected"));
});

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
  console.log("User connected");
  userCount++;

  socket.on("enterEditor", () => {
    io.emit("userStatus", "A user has entered the editor");
  });

  socket.on("leaveEditor", () => {
    io.emit("userStatus", "A user has left the editor");
  });

  io.emit("userCount", userCount); // Add this line

  socket.on("disconnect", () => {
    console.log("User disconnected");
    userCount--;
    io.emit("userCount", userCount); // Add this line
  });
});
