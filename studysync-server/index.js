import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and Start Server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Successfully connected to MongoDB.");

    app.listen(PORT, () => {
      console.log(`Server is up and running at PORT ${PORT}`);
    });
  } catch (error) {
    console.log("MongoDB connection failed!", error.message);
    process.exit(1);
  }
};

startServer();
