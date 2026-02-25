const BASE_URL = "http://localhost:8000";

export const api = {

  getAllNotes: () =>
    fetch(`${BASE_URL}/notes`)
      .then(r => r.json()),

  createNote: (title, content) =>
    fetch(`${BASE_URL}/notes`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ title, content }),
    }).then(r => r.json()),

  updateNote: (id, title, content) =>
    fetch(`${BASE_URL}/notes/${id}`, {
      method:  "PUT",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ title, content }),
    }).then(r => r.json()),

  deleteNote: (id) =>
    fetch(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
    }).then(r => r.json()),

};