"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("An error occurred:", error);
    alert(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-red-600 mb-4">
        Something went wrong!
      </h1>
      <p className="text-gray-700 mb-6">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Retry
      </button>
    </div>
  );
}
