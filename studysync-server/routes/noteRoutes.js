import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  createNote,
  deleteNote,
  getUserNotes,
  updateNote,
} from "../controllers/noteController.js";

const router = express.Router();

// All routes are protected
router.use(protect);

router.post("/", createNote);
router.get("/", getUserNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
