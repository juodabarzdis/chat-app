import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import session from "express-session";

import { Server } from "socket.io";

import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL;

app.use(
  session({
    name: "sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      sameSite: true,
      secure: false,
    },
    secret: process.env.SESSION_SECRET,
  })
);
app.set("trust proxy", 1);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

mongoose.set("strictQuery", false);
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

const server = app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  const onlineClients = [...onlineUsers.keys()];
  socket.emit("online-users", onlineClients);

  socket.on("send-message", (data) => {
    const receiver = onlineUsers.get(data.receiver);
    if (receiver) {
      io.to(receiver).emit("receive-message", data);
    }
  });

  socket.on("disconnect", () => {
    onlineUsers.forEach((value, key) => {
      if (value === socket.id) {
        onlineUsers.delete(key);
      }
    });
  });
});
