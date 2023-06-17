//! Load environment variables from .env file
require("dotenv").config();

//! Import Dependencies
const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

//!importing Routes
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const trainerRoutes = require("./routes/trainerRoutes");

//!importing config DB
const DB = require("./config/connection");

//!importing error handling middleware
const errorHandler = require("./middleware/errorHandler");

//! Create Express App
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:1234",
    // https://getfitgo.online
  },
});

//! Parse incoming request bodies as Json or URL-encoded Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

// !enables Cross-Origin Resource Sharing (CORS) for the server(otherwise browser prevent the request)
app.use(cors(corsOptions));

//! Mount routes
app.use(userRoutes);
app.use(adminRoutes);
app.use(trainerRoutes);

//!handle any errors that occur during the processing of incoming requests.
app.use(errorHandler);

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (uId) => {
  return users.find((user) => user.userId === uId);
};

io.on("connection", (socket) => {
  //when connect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    console.log(userId);
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  console.log(users);
  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log(senderId);
    console.log(receiverId);
    const user = getUser(receiverId);

    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

//!Server starting and Connecting to Port
server.listen(process.env.PORT, () => {
  console.log(`Server connected to port ${process.env.PORT}`);
});

// !Connecting DataBase
DB();
