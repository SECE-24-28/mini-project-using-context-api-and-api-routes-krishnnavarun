"use client";

import { useEffect, useState } from "react";

interface Feedback {
  id: number;
  message: string;
}

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const fetchFeedbacks = async () => {
    const res = await fetch("/api/feedback");
    const data = await res.json();
    setFeedbacks(data.data);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // CREATE
  const addFeedback = async () => {
    await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        department: message,
      }),
    });

    setMessage("");
    fetchFeedbacks();
  };

  // UPDATE (PUT)
  const updateFeedback = async () => {
    await fetch(`/api/feedback?id=${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });

    setEditId(null);
    setMessage("");
    fetchFeedbacks();
  };

  // PATCH
  const patchFeedback = async (id: number) => {
    await fetch(`/api/feedback?id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Patched Feedback",
      }),
    });

    fetchFeedbacks();
  };

  // DELETE
  const deleteFeedback = async (id: number) => {
    await fetch("/api/feedback", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    fetchFeedbacks();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Feedback CRUD</h1>

      <input
        type="text"
        placeholder="Enter feedback"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {editId ? (
        <button onClick={updateFeedback}>Update</button>
      ) : (
        <button onClick={addFeedback}>Add</button>
      )}

      <hr />

      {feedbacks.map((feedback) => (
        <div
          key={feedback.id}
          style={{
            border: "1px solid gray",
            margin: "10px 0",
            padding: "10px",
          }}
        >
          <p>
            <strong>{feedback.id}</strong> - {feedback.message}
          </p>

          <button
            onClick={() => {
              setEditId(feedback.id);
              setMessage(feedback.message);
            }}
          >
            Edit (PUT)
          </button>

          <button onClick={() => patchFeedback(feedback.id)}>
            PATCH
          </button>

          <button onClick={() => deleteFeedback(feedback.id)}>
            DELETE
          </button>
        </div>
      ))}
    </div>
  );
}