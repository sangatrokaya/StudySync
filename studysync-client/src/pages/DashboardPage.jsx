import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios"; /* Custom axios instance */
import { PlusCircle, Trash2 } from "lucide-react"; /* For icons */

const DashboardPage = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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

    if (!title || !content) {
      alert("Please fill in both the fields.");
      return;
    }
    try {
      const res = await axios.post("/notes", { title, content });

      //   Add new note to the top of list
      setNotes([res.data, ...notes]);

      //   Clear form
      setTitle("");
      setContent("");
    } catch (err) {
      console.error(
        "Failed to create new note!",
        err.response?.data?.message || err.message
      );
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
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        StudySync Notes
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Create Note Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl p-6 rounded-2xl space-y-4 border"
        >
          <h3 className="text-xl font-semibold text-gray-700">Create a Note</h3>
          <input
            type="text"
            value={title}
            placeholder="Note Title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={content}
            placeholder="Write Your Note Content Here..."
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg h-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
          >
            <PlusCircle size={20} />
            Add Note
          </button>
        </form>
        {/* Notes List */}
        <div className="sapce-y-4">
          {notes.length === 0 ? (
            <div>No notes yet. Start writing!</div>
          ) : (
            notes.map((note) => (
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
                <p className="text-sm text-gray-400 mt-3">
                  Updated: {new Date(note.updatedAt).toLocaleString()}
                </p>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
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
