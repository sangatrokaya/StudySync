import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Basic health check route
app.get("/", (req, res) => {
  res.send("StudySync API is running...");
});

// Future: import routes here
app.use("/api/users", userRoutes);

export default app;
