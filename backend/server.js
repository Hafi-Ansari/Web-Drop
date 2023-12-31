const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const socketIO = require("socket.io");
const { ExpressPeerServer } = require("peer");
require("dotenv").config();

const app = express();
app.use(cors());

// Read the private key and certificate
const privateKey = fs.readFileSync("/mycerts/privkey.pem", "utf8");
const certificate = fs.readFileSync("/mycerts/fullchain.pem", "utf8");


// Create credentials object
const credentials = {
  key: privateKey,
  cert: certificate,
};

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

const PORT = process.env.PORT || 3000;
const ORIGIN = process.env.CORS_ORIGIN || "*";

const peerServer = ExpressPeerServer(httpsServer, {
  debug: true,
});

app.use("/peerjs", peerServer);

const io = socketIO(httpsServer, {
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
      peerId: data.peerId,
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

peerServer.on("connection", (client) => {
  console.log(`New peer connected with id=${client.id}`);
});

peerServer.on("disconnect", (client) => {
  console.log(`Peer disconnected with id=${client.id}`);
});

httpsServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
