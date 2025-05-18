import express from "express";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// Demo of a protected route
router.get("/profile", protect, (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to your profile!", userId: req.userId });
});

export default router;
