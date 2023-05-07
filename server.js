// const express = require('express');
// const app = express();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);
// const path = require('path');

// const HOST = '0.0.0.0';
// const PORT = process.env.PORT || 3000;
// const INDEX = '/index.html';

// app.use((req, res) => res.sendFile(INDEX, { root: __dirname }));

// http.listen(PORT, HOST, () => {
//   console.log(`Server listening on http://${HOST}:${PORT}`);
// });

// app.use(express.static('build'));

// let numUsers = 0;

// io.on('connection', (socket) => {
//   console.log('User connected');
//   numUsers++;
//   io.emit('userCount', numUsers);

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//     numUsers--;
//     io.emit('userCount', numUsers);
//   });
// });

// const socketUrl = 'wss://realtime-collab.herokuapp.com/ws';
// let socket = new WebSocket(socketUrl);

// socket.on('userCount', (numUsers) => {
//   console.log(`${numUsers} users are logged in`);
//   // Update the UI to show the number of logged in users
// });

//
//

const express = require('express');
const HTTPServer = require('http').Server;
const path = require('path');
const SocketIOServer = require('socket.io').Server;

const PORT = process.env.PORT || 3000;

const app = express();
const http = HTTPServer(app);
const io = new SocketIOServer(http);

console.log('Server starting....');

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

let userCount = 0;

io.on('connection', (socket) => {
  console.log('User connected, socketid:', socket.id);
  userCount++;

  socket.on('askUserCount', () => {
    socket.emit('userCount', userCount);
  });

  io.emit('userCount', userCount);

  socket.on('disconnect', () => {
    console.log('User disconnected');
    userCount--;

    io.emit('userCount', userCount);
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
