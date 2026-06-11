"use client";

import { useState } from "react";
import { useNotes } from "../context/NotesContext";

export default function NotesPage() {
  const [title, setTitle] = useState("");

  const { notes, addNote } = useNotes();

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!title) return;

    await addNote(title);

    setTitle("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notes App</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Enter note"
        />

        <button type="submit">
          Add
        </button>
      </form>

      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  );
}