import React, { useEffect } from "react";

const Toast = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => onClose(), 3000); // hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-5 right-5 bg-gray-800 text-white px-4 py-2 rounded shadow">
      {message}
    </div>
  );
};

export default Toast;
