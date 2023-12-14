const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('app'));
app.set('trust proxy', true);

const userSockets = {};

io.on('connection', (socket) => {
  let clientIP = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address;
  clientIP = (clientIP === '::1') ? '127.0.0.1' : clientIP;

  console.log(`User connected with IP : ${clientIP}`);

  socket.on('setUsername', (username) => {
    userSockets[username] = socket;
    console.log(`User connected: ${username}`);
  });
  
  socket.on('chat message', (data) => {
    const username = Object.keys(userSockets).find((key) => userSockets[key] === socket);
  
    if (username) {
      console.log('message: ' + data.message);
      io.emit('chat message', { username, message: data.message });
    }
  })
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
