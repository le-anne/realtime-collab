// const express = require("express");
// const path = require("path");
// const app = express();
// const server = require("http").createServer(app);
// const io = require("socket.io")(server);

// // Serve the static files from the React app
// app.use(express.static(path.join(__dirname, "build")));

// // Handles any requests that don't match the ones above
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// app.use(express.static("public"));

// let sharedText = "";

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   // Send the current shared text to the new client
//   socket.emit("text-update", sharedText);

//   // Listen for text changes from the clients
//   socket.on("text-change", (updatedText) => {
//     sharedText = updatedText;
//     socket.broadcast.emit("text-update", updatedText);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });

// const port = process.env.PORT || 3000;
// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("build"));

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  io.emit("userStatus", "A user has joined the text editor.");

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    io.emit("userStatus", "A user has left the text editor.");
  });
});

const PORT = process.env.PORT || 3001;

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
