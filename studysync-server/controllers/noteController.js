import Note from "../models/Note.js";

// @desc Create a new note
// @route POST /api/notes
// @status protected
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      res.status(400).json({ message: "Title and Content are required!" });
    }

    const newNote = new Note({
      title,
      content,
      user: req.user._id, // Comes from auth middleware
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Failed to create note!" });
  }
};

// @desc Get all notes of logged-in user
// @route GET /api/notes
// @status Protected
export const getUserNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({
      updatedAt: -1,
    });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to get notes!" });
  }
};

// @desc update a specific note
// @route PUT /api/notes/:id
// @status Protected
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);

    if (!note) return res.status(404).json({ message: "Note not found!" });
    if (note.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized!" });

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;

    const updatedNote = await note.save();
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Failed to update note!" });
  }
};

// @desc Delete a note
// @route DELETE api/notes/:id
// @status Protected
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);

    if (!note) return res.status(404).json({ message: "Note not found!" });
    if (note.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized!" });

    await note.deleteOne();
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete note!" });
  }
};
