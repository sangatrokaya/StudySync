import mongoose from "mongoose";

// define the note schema
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to User model
      required: true,
    },
  },
  { timestamps: true } // adds createdAt and updatedAt fields
);

export default mongoose.model("Note", noteSchema);
