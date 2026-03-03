const BASE_URL = "http://localhost:8001";

export const api = {

    // ── AUTH ─────────────────────────────────────
    
    // Register new user
    register: (username, password) =>
        fetch(`${BASE_URL}/register`, {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify({ username, password }),
        }).then(r => r.json()),


    // Login existing user
    // Returns: {id, username} → App.js saves this
    login: (username, password) =>
        fetch(`${BASE_URL}/login`, {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify({ username, password }),
        }).then(r => r.json()),


    // ── NOTES ────────────────────────────────────

    // Get notes for this specific user only
    getAllNotes: (user_id) =>
        fetch(`${BASE_URL}/notes/${user_id}`)
            .then(r => r.json()),


    // Create note and attach it to this user
    createNote: (user_id, title, content) =>
        fetch(`${BASE_URL}/notes/${user_id}`, {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify({ title, content }),
        }).then(r => r.json()),


    // Update note by id — no change
    updateNote: (id, title, content) =>
        fetch(`${BASE_URL}/notes/${id}`, {
            method:  "PUT",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify({ title, content }),
        }).then(r => r.json()),


    // Delete note by id — no change
    deleteNote: (id) =>
        fetch(`${BASE_URL}/notes/${id}`, {
            method: "DELETE",
        }).then(r => r.json()),

};