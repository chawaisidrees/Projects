import { useState, useEffect } from "react";
import { api } from "./api";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";
import "./App.css";

export default function App() {

  const [notes,    setNotes]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [editNote, setEditNote] = useState(null);
  const [message,  setMessage]  = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    const data = await api.getAllNotes();
    setNotes(data);
    setLoading(false);
  };

  const handleSubmit = async (title, content) => {
    if (editNote) {
      await api.updateNote(editNote.id, title, content);
      setEditNote(null);
      showMessage("Note updated successfully! ✅");
    } else {
      await api.createNote(title, content);
      showMessage("Note created successfully! ✅");
    }
    fetchNotes();
  };

  const handleDelete = async (id) => {
    await api.deleteNote(id);
    showMessage("Note deleted! 🗑️");
    fetchNotes();
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="app">

      <header className="header">
        <h1>📓 Notes App</h1>
        <p>FastAPI + PostgreSQL + React</p>
      </header>

      <div className="stats">
        <div className="stat-box">
          <div className="stat-label">Total Notes</div>
          <div className="stat-num">{notes.length}</div>
        </div>
      </div>

      <NoteForm
        onSubmit={handleSubmit}
        editNote={editNote}
        onCancel={() => setEditNote(null)}
      />

      <div className="section-title">All Notes ({notes.length})</div>

      {loading ? (
        <div className="grid">
          <div className="shimmer" />
          <div className="shimmer" />
          <div className="shimmer" />
        </div>
      ) : notes.length === 0 ? (
        <div className="empty">
          <div>📭</div>
          <p>No notes found — add one above!</p>
        </div>
      ) : (
        <div className="grid">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={(n) => setEditNote(n)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {message && <div className="toast">{message}</div>}

    </div>
  );
}