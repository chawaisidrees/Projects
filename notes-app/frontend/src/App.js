import { useState, useEffect } from "react";
import { api } from "./api";
import NoteForm  from "./components/NoteForm";
import NoteCard  from "./components/NoteCard";
import LoginForm from "./components/LoginForm";
import "./App.css";

export default function App() {

    const [user,     setUser]     = useState(null);
    const [notes,    setNotes]    = useState([]);
    const [loading,  setLoading]  = useState(true);
    const [editNote, setEditNote] = useState(null);
    const [message,  setMessage]  = useState("");
    const [search,   setSearch]   = useState("");


    useEffect(() => {
    if (user) fetchNotes();
    // eslint-disable-next-line
}, [user]);


    const fetchNotes = async () => {
        setLoading(true);
        const data = await api.getAllNotes(user.id);
        setNotes(data);
        setLoading(false);
    };


    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
    };


    const handleLogout = () => {
        setUser(null);
        setNotes([]);
    };


    const handleSubmit = async (title, content) => {
        if (editNote) {
            await api.updateNote(editNote.id, title, content);
            setEditNote(null);
            showMessage("Note updated! ✅");
        } else {
            await api.createNote(user.id, title, content);
            showMessage("Note created! ✅");
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


    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase())
    );


    // Not logged in → show login screen
    if (!user) {
        return <LoginForm onLogin={handleLogin} />;
    }


    return (
        <div className="app">

            <header className="header">
                <div>
                    <h1>📓 Notes App</h1>
                    <p>FastAPI + PostgreSQL + React</p>
                </div>
                <div className="user-info">
                    <span>👤 {user.username}</span>
                    <button className="btn-logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>

            <div className="stats">
                <div className="stat-box">
                    <div className="stat-label">Total Notes</div>
                    <div className="stat-num">{notes.length}</div>
                </div>
            </div>

            <input
                className="search-input"
                placeholder="Search notes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            <NoteForm
                onSubmit={handleSubmit}
                editNote={editNote}
                onCancel={() => setEditNote(null)}
            />

            <div className="section-title">
                All Notes ({filteredNotes.length})
            </div>

            {loading ? (
                <div className="grid">
                    <div className="shimmer" />
                    <div className="shimmer" />
                    <div className="shimmer" />
                </div>
            ) : filteredNotes.length === 0 ? (
                <div className="empty">
                    <div>📭</div>
                    <p>No notes found — add one above!</p>
                </div>
            ) : (
                <div className="grid">
                    {filteredNotes.map((note) => (
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
