import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { getProfile } from "../controllers/userController.js";

const router = express.Router();

router.get(
  "/profile",
  protect,
  (req, res) => {
    res
      .status(200)
      .json({ message: "Welcome to your profile!", userId: req.user._id });
  },
  getProfile
);

export default router;
