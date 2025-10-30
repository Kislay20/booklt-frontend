import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check } from "lucide-react"; // ✅ Lucide icon

export default function ResultPage() {
  const { state } = useLocation();
  const nav = useNavigate();

  const success = state?.success;
  const booking = state?.booking;
  const error = state?.error;

  if (success) {
    return (
      <div className="text-center py-16">
        {/* ✅ Circular green background with white tick */}
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#24AC39] mx-auto mb-4">
          <Check className="text-white w-11 h-11" strokeWidth={3} />
        </div>

        <h2 className="text-2xl font-semibold mt-4">Booking Confirmed</h2>
        <div className="text-gray-500 mt-2">
          Ref ID: {booking?.id || booking?.ref || "N/A"}
        </div>
        <button
          onClick={() => nav("/")}
          className="mt-6 px-4 py-2 rounded"
          style={{ backgroundColor: "#E3E3E3", color: "#656565" }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="text-center py-16">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-600 mx-auto mb-4">
        <span className="text-white text-5xl font-bold">×</span>
      </div>

      <h2 className="text-2xl font-semibold mt-4">Booking Failed</h2>
      <div className="text-gray-500 mt-2">{error || "Unknown error"}</div>
      <button
        onClick={() => nav(-1)}
        className="mt-6 px-4 py-2 bg-gray-200 rounded"
      >
        Try again
      </button>
    </div>
  );
}
