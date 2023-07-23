export const renderInputField = (fieldName, fieldValue, fieldType, onChange) => {
  if (fieldType === "string") {
    return (
      <input
        type="text"
        className="form-control"
        value={fieldValue}
        onChange={(e) => onChange(fieldName, e.target.value)}
        required
      />
    );
  } else if (fieldType === "number") {
    return (
      <input
        type="number"
        className="form-control"
        value={fieldValue}
        onChange={(e) => onChange(fieldName, e.target.value)}
        required
      />
    );
  } else if (fieldType === "text") {
    return (
      <textarea
        className="form-control"
        value={fieldValue}
        onChange={(e) => onChange(fieldName, e.target.value)}
        required
      />
    );
  } else if (fieldType === "boolean") {
    return (
      <select
        className="form-select"
        value={fieldValue}
        onChange={(e) => onChange(fieldName, e.target.value)}
        required
      >
        <option value="">Select</option>
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    );
  } else if (fieldType === "date") {
    return (
      <input
        type="date"
        className="form-control"
        value={fieldValue}
        onChange={(e) => onChange(fieldName, e.target.value)}
        required
      />
    );
  } else {
    return null;
  }
};
