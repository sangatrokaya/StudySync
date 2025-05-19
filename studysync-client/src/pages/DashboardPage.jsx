import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios"; /* Custom axios instance */

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

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
      {/* Create Note Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 bg-white shadow p-4 rounded space-y-4"
      >
        <input
          type="text"
          value={title}
          placeholder="Note Title"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          value={content}
          placeholder="Note Content Here..."
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded h-30"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Create Note
        </button>
      </form>
      {/* Note List */}
      {notes.length === 0 ? (
        <p>No notes found. Start by creating one.</p>
      ) : (
        <div className="sapce-y-4">
          {notes.map((note) => (
            <div key={note._id} className="p-4 border rounded shadow bg-white">
              <h3 className="text-xl font-semibold">{note.title}</h3>
              <p>{note.content}</p>
              <p className="text-sm text-gray-500 font-semibold">
                Updated: {new Date(note.updatedAt).toLocaleString()}
              </p>
              {/* Edit/Delete buttons will come later */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
