import React, { useState } from "react";
import Toast from "../components/Toast";

const ReviewForm = ({ submissions, setSubmissions }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedId, setSelectedId] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });

  const handleReview = (e) => {
    e.preventDefault();
    if (!selectedId || !selectedFile) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageBase64 = reader.result;

      const updated = submissions.map((s) => {
        if (s.id === parseInt(selectedId)) {
          return { ...s, reviewed: true, image: imageBase64 };
        }
        return s;
      });

      setSubmissions(updated);
      setSelectedFile(null);
      setSelectedId("");
      setToast({ show: true, message: "Submission reviewed!" });
    };

    reader.readAsDataURL(selectedFile);
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-2">Reviewer Form</h1>
      <form onSubmit={handleReview} className="flex flex-col gap-2">
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="border p-2"
        >
          <option value="">Select submission</option>
          {submissions
            .filter((s) => !s.reviewed)
            .map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
        </select>

        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className="border p-2"
        />

        <button type="submit" className="bg-green-500 text-white p-2">
          Mark as Reviewed
        </button>
      </form>

      <h2 className="mt-4 font-semibold">Reviewed Submissions</h2>
      <ul>
        {submissions
          .filter((s) => s.reviewed)
          .map((s) => (
            <li key={s.id}>
              {s.title} ✅
              {s.image && (
                <img
                  src={s.image}
                  alt="review"
                  className="w-16 h-16 ml-2 inline-block"
                />
              )}
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

export default ReviewForm;
