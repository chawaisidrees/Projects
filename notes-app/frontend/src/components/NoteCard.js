import "./NoteCard.css";

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="note-card">
      <div className="note-title">{note.title}</div>
      <div className="note-content">{note.content}</div>
      <div className="note-id">ID: #{note.id.slice(0, 8)}</div>
      <div className="card-btns">
        <button className="btn-edit"   onClick={() => onEdit(note)}>✏️ Edit</button>
        <button className="btn-delete" onClick={() => onDelete(note.id)}>🗑️ Delete</button>
      </div>
    </div>
  );
}