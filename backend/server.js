const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
require("dotenv").config();

const app = express();
app.use(cors());
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
const ORIGIN = process.env.CORS_ORIGIN || "*";

const io = socketIO(server, {
  cors: {
    origin: ORIGIN,
  },
});

let users = {};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Register user
  socket.on("register", (username) => {
    users[socket.id] = username;
    io.emit("userList", Object.values(users));
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    delete users[socket.id];
    io.emit("userList", Object.values(users));
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
