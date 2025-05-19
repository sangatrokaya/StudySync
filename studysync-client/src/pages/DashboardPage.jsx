import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        const res = await axios.get("http://localhost:3000/api/notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotes(res.data);
      } catch (error) {
        console.error("Failed to fetch notes!", error);
      }
    };

    fetchNotes();
  }, [token]);

  return (
    <div>
      <h2>Your Notes</h2>
      {notes.length === 0 ? (
        <p>No notes found. Start by creating one.</p>
      ) : (
        <div>
          {notes.map((note) => (
            <div key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <p>Updated: {new Date(note.updatedAt).toLocaleString()}</p>
              {/* Edit/Delete buttons will come later */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
