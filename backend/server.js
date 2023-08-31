const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const { ExpressPeerServer } = require("peer");
require("dotenv").config();

const app = express();
app.use(cors());
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
const ORIGIN = process.env.CORS_ORIGIN || "*";

const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: ""
});

app.use('/peerjs', peerServer);

const io = socketIO(server, {
  cors: {
    origin: ORIGIN,
  },
});

let users = {};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("register", (data) => {
    users[socket.id] = {
      username: data.username,
      deviceInfo: data.deviceInfo,
      peerId: data.peerId, // Save the PeerJS ID
    };
    const userList = Object.keys(users).map((id) => ({ id, ...users[id] }));
    io.emit("userList", userList);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    delete users[socket.id];
    const userList = Object.keys(users).map((id) => ({ id, ...users[id] }));
    io.emit("userList", userList);
  });
});

// When a new peer connects, you can add their ID to the list of users (optional)
peerServer.on("connection", (client) => {
  console.log(`New peer connected with id=${client.id}`);
  // You can add additional logic here if needed
});

// When a peer disconnects, you can remove their ID from the list of users (optional)
peerServer.on("disconnect", (client) => {
  console.log(`Peer disconnected with id=${client.id}`);
  // You can add additional logic here if needed
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
