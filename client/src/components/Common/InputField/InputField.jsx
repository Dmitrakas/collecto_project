import React from "react";

export default function InputField({ label, type, value, onChange }) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}:</label>
      <input
        type={type}
        className="form-control"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
