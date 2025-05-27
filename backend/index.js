import express from "express";
import dotenv from "dotenv"; 
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { app, server } from "./socket/socket.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cookieParser());

const corsOption = {
  origin: 'https://real-time-chat-app-xi-lyart.vercel.app',
  credentials: true
};
app.use(cors(corsOption)); 

// API Routes
app.use("/api/v1/user", userRoute); 
app.use("/api/v1/message", messageRoute);
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Serve React frontend in production
app.use(express.static(path.join(__dirname, 'build')));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
server.listen(PORT, () => {
  connectDB();
  console.log(`Server running at http://localhost:${PORT}`);
});
