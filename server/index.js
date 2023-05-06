const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { harperSaveMessage } = require("./services/harper-save-message");
require("dotenv").config();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const CHAT_BOT = "ChatBot";
let chatRoom = "";
let allUsers = [];
io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    const { username, room } = data;
    chatRoom = room;
    allUsers.push({ id: socket.id, room, username });
    socket.join(room);
    const chatRoomUsers = allUsers.filter((user) => user.room === room);

    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);
    let __createdtime__ = Date.now();
    socket.to(room).emit("received_message", {
      message: `${username} has joined the chat room.`,
      username: CHAT_BOT,
      __createdtime__,
    });

    socket.emit("received_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    });
  });

  socket.on("send_message", (data) => {
    const { message, username, room, __createdtime__ } = data;
    io.in(room).emit("recieved_message", data);
    harperSaveMessage(message, user, room, __createdtime__);
  });
});

app.get("/", (req, res) => {
  return res.send("Hello World");
});
server.listen(4000, () => console.log("server is running on port 4000"));
