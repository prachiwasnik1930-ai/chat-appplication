import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// 🔥 EXPRESS MIDDLEWARE
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// 🔥 SOCKET.IO SETUP
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// 🔥 ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// 🔥 SOCKET LOGIC
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // 📩 SEND MESSAGE
  socket.on("send_message", (data) => {
    console.log("Message:", data);
    socket.broadcast.emit("receive_message", data);
  });

  // ✍️ USER TYPING
  socket.on("typing", (data) => {
    socket.broadcast.emit("user_typing", data);
  });

  // 🛑 STOP TYPING
  socket.on("stop_typing", (data) => {
    socket.broadcast.emit("user_stop_typing", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// 🔥 DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    const PORT = process.env.PORT || 5000;

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => console.log(err));