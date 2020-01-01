const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");
require("dotenv").config();

const app = express();
const server = http.Server(app);
const io = socketio(server);
// mongodb+srv://aircnc:<password>@aircnc-o7vg9.mongodb.net/test
let host =
  "mongodb+srv://" +
  process.env.DB_USER +
  ":" +
  process.env.DB_PASSWORD +
  "@" +
  process.env.DB_HOST +
  "/" +
  process.env.DB_AMBIENTE;

mongoose.connect(host, { useNewUrlParser: true, useUnifiedTopology: true });

const connectUsers = {};

io.on("connect", socket => {
  const { userid } = socket.handshake.query;
  connectUsers[userid] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectUsers = connectUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);
server.listen(process.env.PORT);
