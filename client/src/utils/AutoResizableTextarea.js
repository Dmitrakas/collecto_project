import React, { useState, useRef } from "react";

function AutoResizableTextarea() {
  const textareaRef = useRef(null);
  const [textareaValue, setTextareaValue] = useState("");

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  return (
    <textarea
      ref={textareaRef}
      className="form-control"
      value={textareaValue}
      onChange={handleTextareaChange}
    />
  );
}

export default AutoResizableTextarea;
