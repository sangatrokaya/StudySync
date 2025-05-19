import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

const DashboardPage = () => {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  //   Get token from localStorage
  const token = localStorage.getItem("token");

  //   Redirect if no token
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
        console.error("Failed to fetch notes!", error);
      }
    };

    fetchNotes();
  }, [token]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
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
