import express from "express";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Basic health check route
app.get("/", (req, res) => {
  res.send("StudySync API is running...");
});

// Future: import routes here
// import userRoutes from './routes/userRoutes.js';
// app.use("/api/users", userRoutes);

export default app;
