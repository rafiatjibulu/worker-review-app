import React, { useState } from "react";
import Toast from "../components/Toast";

const WorkerForm = ({ submissions, setSubmissions }) => {
  const [title, setTitle] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    const newSubmission = {
      id: Date.now(),
      title,
      reviewed: false,
      image: null,
    };

    setSubmissions([...submissions, newSubmission]);
    setTitle("");
    setToast({ show: true, message: "Submission added!" });
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Worker Form</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Submit
        </button>
      </form>

      <h2 className="mt-4 font-semibold">Your Submissions</h2>
      <ul>
        {submissions.map((s) => (
          <li key={s.id}>
            {s.title} {s.reviewed ? "✅ Reviewed" : "❌ Pending"}
          </li>
        ))}
      </ul>

      <Toast
        message={toast.message}
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
};

export default WorkerForm;
