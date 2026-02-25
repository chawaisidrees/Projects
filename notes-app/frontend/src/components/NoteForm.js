import { useState, useEffect } from "react";
import "./NoteForm.css";

export default function NoteForm({ onSubmit, editNote, onCancel }) {

  const [title,   setTitle]   = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>{editNote ? "✏️ Edit Note" : "📝 New Note"}</h2>

      <div className="input-group">
        <label>Title</label>
        <input
          placeholder="Enter note title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Content</label>
        <textarea
          placeholder="Write your note here..."
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={4}
        />
      </div>

      <div className="form-btns">
        <button type="submit" className="btn-primary">
          {editNote ? "Update Note ✅" : "+ Add Note"}
        </button>
        {editNote && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}