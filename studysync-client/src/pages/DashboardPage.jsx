import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios"; /* Custom axios instance */
import {
  PlusCircle,
  Trash2,
  SquarePen,
  LogOutIcon,
  X,
} from "lucide-react"; /* For icons */
import toast from "react-hot-toast";

const DashboardPage = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [tags, setTags] = useState([]); /* NEW: tags array */
  const [newTag, setNewTag] = useState(""); /* NEW: controlled tag input */

  const navigate = useNavigate();

  //   Get token from localStorage
  const token = localStorage.getItem("token");

  //   Redirect to login if no token
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  //   Fetch notes from backend
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(
          "/notes"
        ); /* Just the relative path in place of whole url and headerrs */
        setNotes(res.data);
      } catch (error) {
        console.error(
          "Failed to fetch notes!",
          error.response?.data?.message || error.message
        );
      }
    };

    fetchNotes();
  }, []);

  //   Submit new note to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form Validation
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content cannot be empty!");
      return;
    }

    try {
      if (isEditing) {
        // Update existing note
        const res = await axios.put(`/notes/${editNoteId}`, {
          title,
          content,
          tags,
        });

        // Replace the updated note in the list
        const updatedNotes = notes.map((note) =>
          note._id === editNoteId ? res.data : note
        );
        setNotes(updatedNotes);

        // Reset editing state
        setIsEditing(false);
        setEditNoteId(null);
      } else {
        //   Add new note to the top of list
        const res = await axios.post("/notes", { title, content });
        setNotes([res.data, ...notes]);
      }

      //   Reset form
      setTitle("");
      setContent("");
      setTags([]);
      toast.success(isEditing ? "note updated!" : "Note added!");
    } catch (err) {
      console.error(
        "Failed to add/update a new note!",
        err.response?.data?.message || err.message
      );

      // Enhanced error handler
      if (err.resonse && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else if (err.message === "Network Error") {
        toast.error("network error. Please check your connection.");
      } else {
        toast.error("Something went wrong while adding the note.");
      }
    }
  };

  //   Delete the note
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await axios.delete(`/notes/${id}`);
      setNotes(
        notes.filter((note) => note._id !== id)
      ); /* Update UI immediately */
    } catch (err) {
      console.error(
        "Error deleting the note!",
        err.response?.data?.message || err.message
      );
      toast.error("Error deleting the note!");
    }
  };

  //   Edit handler
  const handleEdit = (note) => {
    setIsEditing(true);
    setEditNoteId(note._id);
    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags || []);
  };

  // Add tags handler
  const handleAddTag = () => {
    const tag = newTag.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setNewTag("");
    }
  };

  // Remove tags handler
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Filter + Sort Notes list before rendering
  const filteredNotes = notes
    .filter((note) => {
      const query = searchQuery.toLowerCase();
      return (
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query) ||
        (note.tags || []).some((tag) => tag.toLowerCase().includes(query))
      );
    })
    .filter((note) => {
      if (filterBy === "long") return note.content.length > 100;
      if (filterBy === "short") return note.content.length <= 100;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      } else {
        return new Date(a.updatedAt) - new Date(b.updatedAt);
      }
    });

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <input
          type="text"
          value={searchQuery}
          placeholder="Search notes..."
          className="flex-1 w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={() => {
            localStorage.removeItem("token"); /* clear token */
            navigate("/login"); /* Redirect to login */
          }}
          className="bg-red-500 hover:bg-red-600 flex items-center gap-2 text-white py-2 px-4 rounded-lg transition-colors duration-200"
        >
          <LogOutIcon size={20} />
          Log out
        </button>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        StudySync Notes
      </h2>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="latest">Sort: Latest First</option>
          <option value="Oldest">Sort: Oldest First</option>
        </select>
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Filter: All Notes</option>
          <option value="long">Long Notes</option>
          <option value="short">Short Notes</option>
        </select>
      </div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Create Note Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl p-6 rounded-2xl space-y-4 h-[400px] overflow-auto border"
        >
          <h3 className="text-xl font-semibold text-gray-700">
            {isEditing ? "Edit Note" : "Create a Note"}
          </h3>
          <input
            type="text"
            value={title}
            placeholder="Note Title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={content}
            placeholder="Write Your Note Content Here..."
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg px-4 py-2 h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Tags Section */}
          <div>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTag}
                placeholder="Enter tags"
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="bg-blue-500 text-white px-4 py-1 rounded-lg"
              >
                Add Tag
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-blue-500 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
          >
            <PlusCircle size={20} />
            {isEditing ? "Update Note" : "Add Note"}
          </button>
        </form>

        {/* Notes List */}
        <div className="space-y-4">
          {filteredNotes.length === 0 ? (
            <div>No notes found. Start writing!</div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note._id}
                className="p-5 rounded-xl shadow-lg bg-white border relative hover:shadow-xl transition "
              >
                <h4 className="text-lg font-bold text-gray-800">
                  {note.title}
                </h4>
                <p className="text-gray-700 mt-2 whitespace-pre-wrap">
                  {note.content}
                </p>
                {note.tags && note.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-200 text-sm px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-sm text-gray-400 mt-3">
                  Updated: {new Date(note.updatedAt).toLocaleString()}
                </p>
                <button
                  onClick={() => handleEdit(note)}
                  className="absolute top-3 right-10 text-blue-500 hover:text-blue-700"
                >
                  <SquarePen size={20} />
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
