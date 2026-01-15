import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import WorkerForm from "./pages/WorkerForm";
import ReviewForm from "./pages/ReviewForm";

function App() {
  // Load submissions from localStorage (so data stays on refresh)
  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem("submissions");
    return saved ? JSON.parse(saved) : [];
  });

  // Save submissions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("submissions", JSON.stringify(submissions));
  }, [submissions]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <nav className="flex justify-between mb-4">
        <Link to="/">Worker</Link>
        <Link to="/review">Reviewer</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<WorkerForm submissions={submissions} setSubmissions={setSubmissions} />}
        />
        <Route
          path="/review"
          element={<ReviewForm submissions={submissions} setSubmissions={setSubmissions} />}
        />
      </Routes>
    </div>
  );
}

export default App;
