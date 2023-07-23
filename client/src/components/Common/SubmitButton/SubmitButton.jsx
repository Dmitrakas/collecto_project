import React from "react";

export default function SubmitButton({ label }) {
  return (
    <button type="submit" className="btn btn-primary">
      {label}
    </button>
  );
}
